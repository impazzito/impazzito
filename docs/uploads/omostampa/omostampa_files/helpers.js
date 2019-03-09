jQuery.noConflict();
var django = {"jQuery": jQuery.noConflict()};

/* settings */
var AJAX_LOADING_CLASS = "ajax-loading";
var DIV_DEFAULT_LOADING = "default_loading";
var DIV_DEFAULT_MODAL = "default_modal"
var DIALOG_CLASS = "dialoglink";

var after_json_call = new Array();

/* Querystring utils */

function decode(s) {
    try {
        return decodeURIComponent(s).replace(/\r\n|\r|\n/g, "\r\n");
    } catch (e) {
        return "";
    }
}
function querystring_to_array(qs) {
    var multimap = {};
    if (! qs) return multimap;
    if (qs.length > 1) {
        qs.replace(/([^=&]+)=([^&]*)/g, function(match, hfname, hfvalue) {
            var name = decode(hfname);
            var value = decode(hfvalue);
            if (name.length > 0) {
                multimap[name] = value;
            }
        });
    }
    return multimap;
}
function array_to_querystring(array) {
    var s = ""
    for (var key in array) {
        s += key + "=" + encodeURIComponent(array[key]) + "&";
    }    
    return s.substring(0, s.length-1);
}

function update_link_query_string(href) {
    var current = get_ajax_or_current_location()
    
    if (current) {
        var original = querystring_to_array(href.split("?")[1])
        current = querystring_to_array(current.split("?")[1])
        for (var key in current) {
            original[key] = current[key];   
        }
        return href.split("?")[0] + "?" + array_to_querystring(original);
    }
    return href
}

function dev_alert(obj) {
    if (is_good_browser()) console.log(obj)
    return
}

/* form serializer */
function form_to_token(form_id) {
    var token = "";
    
    if(typeof(form_id) == "string") {
        var array = jQuery("#"+form_id).serializeArray()
    } else {
        var array = form_id.serializeArray()
    }
    for (x in array) token += escape(array[x].name) + "=" + encodeURIComponent(array[x].value) + "&";
    token = token.substring(0, token.length-1);
    dev_alert(token)
    return token
}

/* Error utils */

function default_ajax_error_handler() {
    error_parser("Error", ["505 or Gateway error, sorry!"]);
}

function error_parser(title, help) {
    var content = "";
    var i = help.length;
    while (i--) {
        content += '<div class="alert alert-warning">'+help[i]+'</div>';
    }                
    default_popup(content, title)        
}

/* Ajax utlis */
function start_ajax_loading(){
    jQuery("body").addClass(AJAX_LOADING_CLASS);
    jQuery("#"+DIV_DEFAULT_LOADING).show();
}    
function stop_ajax_loading(){
    jQuery("body").removeClass(AJAX_LOADING_CLASS);
    jQuery("#"+DIV_DEFAULT_LOADING).hide();
} 
function javascript_popup(url) {
    window.open(url, "popup_id", "scrollbars,resizable,width=300,height=400");
    return false;
}
function InjectJson(jsonObj) {
    
    var json = jsonObj.responses;
    for (index in json) {
        
        var d = json[index];
        var el = jQuery(d.inject_to);
        var mode = d.mode || "html";
        
        try {
            eval("el."+mode+"(d.response)");
        } catch(e) {
            if (DEBUG) alert(e);
        }
        // alert(mode+", "+d.inject_to)
    }
    
    var json = jsonObj.js;
    for (index in json) {
        try {
            eval(json[index]);
        } catch(e) {
            if (DEBUG) alert(e);
        }
        // alert(json[index])
    }    
    if (jsonObj.title) {
        document.title = jsonObj.title
    }
}

function track_action(action_name, action_id) {
    dev_alert("Tracking to google action "+action_name+": "+action_id);
    if (typeof(_gaq) != "undefined" && !IS_STAFF) _gaq.push(['_trackEvent', action_name, action_id, window.location.href]);
    return true;
}

function track_url(url) {
    var final_url = url;
    if (startswith(url, "?")) final_url = window.location.pathname + url
    dev_alert("Tracking to google page "+final_url)
    if (typeof(_gaq) != "undefined" && !IS_STAFF)  _gaq.push(['_trackPageview', final_url]);
    return true
}

/* jQuery animation timing */
function is_good_browser() {
    return jQuery.browser.webkit || jQuery.browser.mozilla || jQuery.browser.opera;
}

function animation_fast() { return is_good_browser() ? "fast" : null }

function animation_slow() { return is_good_browser() ? "slow" : null }

function admin_url(app_label, module_name, object_id) {
    var prefix = USER_PATH;
    if (IS_STAFF) prefix = STAFF_PATH;
    var url = prefix+app_label+"/"+module_name+"/";
    if (object_id) url += object_id + "/";
    return url;
}

var AJAX_REQUEST_CACHE = {};

function change_window_location(url) {
    window.location = url
}

function AjaxRequest(d, hide_ajax_loading, cache, callback) {
    
    if (cache && AJAX_REQUEST_CACHE["ajr:"+d["url"]]) {
        data = AJAX_REQUEST_CACHE["ajr:"+d["url"]]
        InjectJson(data);
        exec_after_json_call();   
        if (callback) callback(data);
        stop_ajax_loading();
        
    } else {
        
        if (! hide_ajax_loading) start_ajax_loading();
        
        var defaults = {
            dataType: 'json',
            error: function(e) { 
                default_ajax_error_handler()
                stop_ajax_loading();
            }, 
            success: function(data) {
                if (cache) AJAX_REQUEST_CACHE["ajr:"+d["url"]] = data;
                InjectJson(data);
                stop_ajax_loading();
                exec_after_json_call();
                if (callback) callback(data)
            }
        }    
        for (index in d) defaults[index] = d[index];
        return jQuery.ajax(defaults);   
    }
}

function fetch_softwork_data(url, onsuccess, hide_ajax_loading, cache) {
    
    if (cache && AJAX_REQUEST_CACHE["sfd:"+url]) {
        onsuccess(AJAX_REQUEST_CACHE["sfd:"+url]);
    } else {    
        
        dev_alert("fetching url "+url)
        if (! hide_ajax_loading) start_ajax_loading();
        
        var defaults = {
            url: url,
            dataType: 'json',
            cache: true,
            error: function(e) { 
                stop_ajax_loading();
                var data = null
                try {
                    data = jQuery.parseJSON(e["responseText"])
                } catch(err) {
                    return default_ajax_error_handler()
                }
                return error_parser(data.error.kind, data.error.help)
            }, 
            success: function(data) {
                stop_ajax_loading();
                if (data.error) {
                    return error_parser(data.error.kind, data.error.help)
                } else {
                    if (cache) AJAX_REQUEST_CACHE["sfd:"+url] = data;
                    return onsuccess(data)
                }
            }
        }       
        return jQuery.ajax(defaults);
    }
}

function highlight_rows(rows){
    
    rows.mouseover(function(){
      jQuery(this).addClass('hoverrow');
    });
    rows.mouseout(function(){
      jQuery(this).removeClass('hoverrow');
    });    
}

/* string and link utils */
function startswith(string, initial) {
    return string && string.indexOf(initial) === 0;
}

function is_internal(href) {
    if (startswith(href, window.location.protocol + "//" + window.location.host)) return true;
    if (! (startswith(href, "http://") || startswith(href, "https://"))) return true;
    return false;
}

function add_get_param(href, key, value) {
    var params = querystring_to_array(href.split("?")[1])
    if (value) {
        params[key] = value
    } else {
        delete params[key]
    }
    
    var url = href.split("?")[0]
    var extra = array_to_querystring(params)
    if (extra) url += "?" + extra;
    var extra = href.split("#")[1];
    if (extra) url += "#"+extra
    return url
}

/* popup utilities */

var DEFAULT_POPUP = document.createElement("div");

function default_popup(content, title) {
    
    var modal = jQuery("#"+DIV_DEFAULT_MODAL);
    
    var html = jQuery("<div></div>")
    
    inner    = '<div class="modal-header">';
    inner   += '<a class="close" data-dismiss="modal">&times;</a>';
    inner   += '<h3>'+title+'</h3>';
    inner   += '</div>';
    
    html.append(inner)
    
    inner    = jQuery('<div class="modal-body"></div>')
    inner.append(content)
    
    html.append(inner)
    
    modal.html(html);
    modal.modal('show')
    
    modal.off('hidden');
    
    //jQuery("#"+DIV_DEFAULT_MODAL+" [rel=tooltip]").tooltip();
    
    /*
    popup_div = jQuery(DEFAULT_POPUP);
    popup_div.html(html).dialog({
        title: title,
        autoOpen:  true,
        modal:     true,
        resizable: false,
        width:     parseInt(width)+"px"
    });
    */
    
    LAST_POPUP = modal;
    
    return modal;
}

function close_default_popup() {
   jQuery("#"+DIV_DEFAULT_MODAL).modal("hide");
   
}

function iframe_link(url, height) {
    
    if (! height) height = 390;
    
    url = jQuery(url);
    
    var title = url.attr("title") || url.text();
    var iframe_href = url.attr("href");
    
    if (is_internal(iframe_href)) iframe_href = add_get_param(iframe_href, "pop", "1");
    
    var inner_iframe = '<iframe' inner_iframe="" +=" frameborder="0"" +height+'"'="" +iframe_href+'"'="" modal="default_popup(inner_iframe.toString()," title)="" modal.on('hidden',="" function()="" {="" var="" new_url="update_link_query_string(window.location.href);" if="" (url.is('.update-on-close'))="" start_ajax_loading();="" (new_url="=" window.location.href)="" window.location.reload();="" }="" else="" change_window_location(new_url)="" };="" (url.is('.ajax-update-on-close'))="" ajaxrequest({="" url:new_url="" });="" })="" *="" anchor="" utilis="" function="" get_ajax_location()="" location="this.location.href.split("#")[1];" (location="" &&="" startswith(location,="" "!"))="" return="" location.slice(1);="" get_ajax_or_current_location()="" current="get_ajax_location();" (!="" current)="" window.location.search="" set_ajax_location(location,="" do_not_track)="" check="" browser="" support="" html5="" history="" push="" state="" (typeof(window.history.pushstate)="=" 'function')="" window.history.pushstate({url:location},="" location,="" location);="" window.location.hash="!" location;="" track_url(location)="" exec_after_json_call()="" for="" (index="" in="" after_json_call)="" after_json_call[index]();="" jquery(".tooltip.in,.popover.in").remove();="" dom="" ready="" actions="" jquery(document).ready(function()="" jquery('body').on('click',="" '.updatedlink',="" function(e)="" url="jQuery(this);" url.attr("href",="" update_link_query_string(url.attr("href")));="" }).on("click",="" "a.updatenext",="" add_get_param(="" url.attr("href"),="" "next",="" get_ajax_or_current_location())="" );="" "."+dialog_class,="" (e.which="=" 1)="" e.preventdefault();="" iframe_link(this);="" }).on("submit",="" "form",="" (e)="" form="jQuery(this);" track_action("form-submit",="" form.attr("id"));="" (form.hasclass("updatenext"))="" form.attr("action",="" form.attr("action"),="" }).tooltip({="" selector:"[rel*="tooltip]"" fix="" placeholder="" problem="" ie="" and="" old="" browsers="" jquery("input,="" textarea").placeholder();="" stop_ajax_loading();="" png="" compressed="" (function(a){a.fn.pngie="function(c){settings=a.extend({blankgif:"http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif",sizingMethod:"crop"},c);if(a.browser.msie&&parseInt(a.browser.version,10)<7){var" b="function(){if(!/^progid\:DXImageTransform\.Microsoft\.AlphaImageLoader/.test(this.runtimeStyle.filter)&&a(this).width()">0){a(this).attr("width",a(this).width()).attr("height",a(this).height());this.runtimeStyle.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+a(this).attr("src")+'", sizingMethod="'+settings.sizingMethod+'");';a(this).attr("src",settings.blankgif)}};a(this).filter("[src$=.png]").add("[src$=.png]",this).each(b);a("[src$=.png]").live("mousemove",function(){a(this).each(b);a("[src$=.png]").each(b)});a("[src$=.png]").load(b);a(window).load(function(){a("[src$=.png]").each(b)});a("*",this).each(function(e){var d=a(this).css("background-image");if(typeof(d)=="string"&&d!="none"&!/^progid\:DXImageTransform\.Microsoft\.AlphaImageLoader/.test(this.runtimeStyle.filter)){d=/url\([\"\']?(.*\.png)[\"\']?\)/.exec(d);if(d&&d.length>1&&a(this).css("background-repeat").indexOf("no-")>-1){a(this).css("background-image","none").attr("contentEditable",true).attr("width",a(this).width()).attr("height",a(this).height());this.runtimeStyle.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+d[1]+'",sizingMethod="'+settings.sizingMethod+'")'}}})}return a}})(jQuery);
</iframe'>