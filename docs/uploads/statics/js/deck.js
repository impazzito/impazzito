function random_order(){
    return (Math.round(Math.random())-0.5); 
}

function build_deck(signs, numbers) {
    var deck = new Array();
    var s = 0;
    
    while(s<signs.length) 1="" 100="" {="" var="" n="0;" while(n<numbers.length)="" deck.push(new="" array(numbers[n],="" signs[s]));="" n++;="" aumento="" l'indice="" di="" }="" s++;="" return="" deck;="" function="" inject_play_deck(el_prefix)="" true="" percentage(part,="" total)="" math.round(10000="" *="" (part="" total))="" build_deck_from_prefix(settings_prefix)="" if="" (jquery("#"+settings_prefix+"_cards")="=" "italians")="" numbers="new" array(1,2,3,4,5,6,7,8,9,10);="" signs="new" array("spade",="" "bastoni",="" "denari",="" "coppe");="" else="" array(1,2,3,4,5,6,7,8,9,10,="" "j",="" "q",="" "k");="" array("cuori",="" "quadri",="" "fiori",="" "picche");="" build_deck(signs,="" numbers)="" update_results(prefix,="" success,="" failure)="" test_number="success+failure;" html="successi: " +success+"<br="">";
    html += "fallimenti: "+failure+"<br>";
    html += "percentuale di successo: "+percentage(success, test_number)+"%<br>";
    html += "percentuale di fallimento: "+percentage(failure, test_number)+"%<br>";
    jQuery("#"+prefix+"_results").html(html);    
}


function inject_test_deck(settings_prefix, prefix) {
    
    jQuery("#"+prefix+"_form").submit(function() {
            
    var i=0;
    var success = 0;
    var failure = 0;
    var test_number = parseInt(jQuery("#"+prefix+"_number").val());
    var max_number = parseInt(jQuery("#"+settings_prefix+"_number").val());
    
    var deck = build_deck_from_prefix(settings_prefix);
    
    for (i=0;i</signs.length)>