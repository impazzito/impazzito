---
title: 'Un, due, tre'
id: 523
categories:
  - Deliri
tags:
---

<style type="text/css">

</style>

<div id="settings_deck">

Tipo di carte: <select id="settings_deck_cards">
<option value="italian" selected="selected">Italiane (40 carte)</option>
<option value="franch">Francesi (52 carte)</option>
</select>
Contare fino a: <select id="settings_deck_number">
<option value="1">Uno (Ti piace perdere, eh?!?)</option>
<option value="2">Due</option>
<option value="3" selected="selected">Tre (Gioco originale)</option>
<option value="4">Quattro</option>
<option value="5">Cinque</option>
<option value="6">Sei</option>
<option value="7">Sette</option>
<option value="8">Otto</option>
<option value="9">Nove</option>
<option value="10">Dieci</option>
</select>

</div>

<form id="test_deck_form">
<label for="test_deck_number">Numero di partite <select id="test_deck_number">
<option value="1">Una (hai perso!)</option>
<option value="10">Dieci</option>
<option value="20">Venti</option>
<option value="50">Cinquanta</option>
<option value="100">Cento (forse una la vinci...)</option>
<option value="1000" selected="selected">Mille</option>
<option value="10000">Diecimila</option>
<option value="100000">Centomila</option>
<option value="500000">Cinquecentomila</option>
<option value="1000000">Un milione!!!!</option>

</select> <input type="submit" id="test_deck_submit" value="Testa adesso"/></label> 

</form> 
<div id="test_deck_results"></div>

<script type="text/javascript" src="/sites/impazzito.it/uploads/statics/js/deck.js?v=1.01"></script>
<script type="text/javascript">
jQuery.noConflict();
jQuery(document).ready(function() {
    inject_test_deck("settings_deck", "test_deck");
    inject_play_deck("settings_deck", "test_play");
});
</script>

Il codice sorgente dell'applicazione è rilasciato con licenza creative commons e lo trovate [qui](/wp-content/uploads/statics/js/deck.js).