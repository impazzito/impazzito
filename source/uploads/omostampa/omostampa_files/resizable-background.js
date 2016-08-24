var RESIZABLE_BACKGROUND = null;
var RESIZABLE_BACKGROUND_CACHE = new Array();

function resizable_background_load(url) {
    RESIZABLE_BACKGROUND.css({
        "background-image":"url("+url+")",
        "background-position":"center center",
        "background-repeat":"no-repeat",
        "background-attachment":"fixed",
        "-moz-background-size": "cover",
        "-webkit-background-size": "cover",
        "-o-background-size": "cover",   
        "background-size": "cover",
        "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+url+"', sizingMethod='scale')",
        "-ms-filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+url+"', sizingMethod='scale')",
        "position":"fixed",
        "width":"100%",
        "height":"100%",
    });
    RESIZABLE_BACKGROUND.fadeIn("slow");
    jQuery("#content").css({
        "background-color": "rgba(255,255,255,0.9)",
    }, "slow")             
}

function resizable_background_cache(url) {
    if (! RESIZABLE_BACKGROUND_CACHE[url]) {
        jQuery('<img src="'+url+'"/>').load(function() {
            resizable_background_load(url)
            RESIZABLE_BACKGROUND_CACHE[url] = true;
        })        
    } else {
        resizable_background_load(url)
    }
}    

function resizable_background(url) {
    if (! RESIZABLE_BACKGROUND) {
        RESIZABLE_BACKGROUND = jQuery('<div></div>');
        jQuery(document.body).prepend(RESIZABLE_BACKGROUND)
        RESIZABLE_BACKGROUND.hide()
        resizable_background_cache(url)
    } else {
        RESIZABLE_BACKGROUND.fadeOut("slow", function() {resizable_background_cache(url)})
    }
};

var MEDIA_PREFIX = "http://sprint24.com/media/db/photos/";
var DEFAULT_IMAGES = []
/*
var DEFAULT_IMAGES = [    
    MEDIA_PREFIX+"heidelberg-cd102/original.jpg",
    MEDIA_PREFIX+"heidelberg-cd102-01/original.jpg",
    MEDIA_PREFIX+"heidelberg-cd102-02/original.jpg",
    MEDIA_PREFIX+"heidelberg-cd102-03/original.jpg",
    MEDIA_PREFIX+"xerox-igen/original.jpg",
    MEDIA_PREFIX+"xerox-igen-01/original.jpg",
    MEDIA_PREFIX+"xerox-igen-logo/original.jpg",
    MEDIA_PREFIX+"fatture-rotostampa-01/original.jpg",
    ]
*/

jQuery(document).ready(function() {
        
    var image_array = []
        
    jQuery('meta[property="og:image"]').not('meta[autoload=false]').each(function (i) {
        image_array[i]=jQuery(this).attr("content");
    });
    
    if (image_array.length == 0) image_array = DEFAULT_IMAGES
    
    if (image_array.length >= 1) {
        
        image_array.sort(function() {return Math.round(Math.random())-0.5});

        resizable_background(image_array[0]);
        if (image_array.length > 1) {
            var image_index = 0;
            var intervalID = setInterval(function() {
                ++image_index;
                if (image_index >= image_array.length) {
                    image_index = 0;
                }
                resizable_background(image_array[image_index]);   // set new news item into the ticker
            }, 20000);        
        }
    }
})
