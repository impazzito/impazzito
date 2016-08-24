function random_order(){
    return (Math.round(Math.random())-0.5); 
}

function build_deck(signs, numbers) {
    var deck = new Array();
    var s = 0;
    
    while(s<signs.length) {
        var n = 0;
        while(n<numbers.length) {
            deck.push(new Array(numbers[n], signs[s]));
            n++; //aumento l'indice di 1
        } 
    s++; //aumento l'indice di 1
    } 
    return deck;
    
}

function inject_play_deck(el_prefix) {
    return true
}

function percentage(part, total) {
    return Math.round(10000 * (part/total))/100
}

function build_deck_from_prefix(settings_prefix) {
    if (jQuery("#"+settings_prefix+"_cards") == "italians") {
        var numbers = new Array(1,2,3,4,5,6,7,8,9,10);
        var signs = new Array("Spade", "Bastoni", "Denari", "Coppe");
    } else {
        var numbers = new Array(1,2,3,4,5,6,7,8,9,10, "J", "Q", "K");
        var signs = new Array("Cuori", "Quadri", "Fiori", "Picche");    
    }
    return build_deck(signs, numbers)
}

function update_results(prefix, success, failure) {
    
    var test_number = success+failure;
    html  = "successi: "+success+"<br/>";
    html += "fallimenti: "+failure+"<br/>";
    html += "percentuale di successo: "+percentage(success, test_number)+"%<br/>";
    html += "percentuale di fallimento: "+percentage(failure, test_number)+"%<br/>";
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
    
    for (i=0;i<test_number;i++) {
        
        deck.sort(random_order);
        
        var current_success = true;
        var s = 0;
        var current_step = 0;
        
        while(s<deck.length && current_success) {
            var current = deck[s];
            
            current_step += 1;
            
            if (current[0] == current_step) {
                failure += 1;
                current_success = false;
            }
            
            if (current_step == max_number) current_step = 0;
            s++;
        } 
        if (current_success) success+=1;
        
        //if ((i % 100) == 0) update_results(prefix, success, failure);
           
    }
    update_results(prefix, success, failure)
    return false;
    });
}
