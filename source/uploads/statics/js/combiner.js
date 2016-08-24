/* CONVENTIONS */
var COMBINER_SEPARATOR = ", "
function format_results(list, separator) {
    return  "<li>"+list.join(separator)+"</li>";
}

/* UTILS */
function trim(s){ 
    return (s || '').replace(/^\s+|\s+$/g, ''); 
}
function clean_list(list) {
    var clean = new Array();
    jQuery.each(list, function(index, value) { 
        var next = trim(value);
        if (next.length) {
            clean.push(next)
        }
    });    
    return clean
}

var combine = function(a) {
  var fn = function(n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  }
  var all = [];
  for (var i=1; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  return all;
}

function generate_combinations(list) {
    var combinations = new Array();
    while (list.length > 0) {
        var current = list.pop();
        var next = new Array(current, current);
        combinations.push(next);
        jQuery.each(list, function(index, value) { 
            next = new Array(current, value);
            combinations.push(next);
        });
    }
    combinations.reverse();
    return combinations
}

/* INJECTION FUNCTIONS */ 
function update_combiner(prefix) {
    var results = "";
    var separator = jQuery("#"+prefix+"_separator").val() || COMBINER_SEPARATOR;
    var combinations = combine(clean_list(jQuery("#"+prefix+"_input").val().split(",")));
    jQuery.each(combinations, function(index, value) { 
        results += format_results(value, separator);
    });    
    jQuery("#"+prefix+"_results").html(results);
    return false;
}

function inject_combiner(prefix) {
    function bound_update_combiner() {return update_combiner(prefix);}
    jQuery("#"+prefix+"_form").submit(bound_update_combiner);
    jQuery("#"+prefix+"_input, #"+prefix+"_separator").change(bound_update_combiner);
    jQuery("#"+prefix+"_defaults a, ."+prefix+"_link").click(function (e) {
        var self = jQuery(this).attr("href", "#"+prefix+"_form");
        jQuery("#"+prefix+"_input").val(self.text());
        bound_update_combiner();
        return true;
    });
    bound_update_combiner();
}
/*
To inject the combiner you must have
a input with id PREFIX_input (required, input or textarea)
a form with id PREFIX_form (optional)
a select with id PREFIX_separator (optional)
a submit with id PREFIX_submit (optional)
a list to inject result (ul or ol) with id PREFIX_results (required)

and then call something like that

jQuery.noConflict();
jQuery(document).ready(function() {
    inject_combiner("combiner");
});
*/
