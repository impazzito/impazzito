---
title: Il moltiplicatore di concetti
tags:
  - applicazioni
  - Realtà
  - vita vissuta
id: 358
categories:
  - Applicazioni
  - Realtà
  - Vetrina
date: 2010-10-27 17:56:35
---

<div id="combiner_disclaimer">Attenzione, questo è un post interattivo,** al fine di massimizzare il divertimento si prega il lettore di cliccare pressochè ovunque**, [dove possibile](#!).
<small>Se non funziona, buttate internet explorer e mettete un altro browser a caso (anche opera è meglio).</small></div>
Per chi non lo sapesse io sono un programmatore, in realtà ho provato a fare altro nella vita, ma ho finito per fare questo perchè, per quanto mi sforzi, la mia capoccia ha un approccio analitico ai problemi della vita.
Nel senso che non appena mi ritrovo davanti un qualsivoglia problema che si ripete nel corso del tempo il mio essere tende a generare un algoritmo per ridurre al minimo la monotonia ed automatizzare la procedura da seguire per risolvere il suddetto problema.

Si chiama approccio analitico: scompongo il processo in microprocessi, lo analizzo e lo risolvo, è l'unica cosa che so fare.

Ergo nella mia vita coniugale mi ritrovo davanti continuamente un problema di rapporti sociali, essendo io una persona leggermente introversa tendo ad usare pochissime parole e concetti ed a parlare il meno possibile. **Se non ho niente da dire tendo a stare zitto**, cosa che non sempre è gradita da parte del coniuge.

**Ergo avendo io a disposizione pochi concetti per far felice la mia amata ho generato un algoritmo che moltiplica il numero di frasi e di periodi che possono essere fatti con dei semplici concetti base.
**
Il seguente algoritmo mi consente di ampliare alla grandissima il mio repertorio di frasi, ad esempio partendo da [miciola, miao, gattona, bubu](#!) si ottiene:
<script type="text/javascript" src="/uploads/statics/js/combiner.js"></script>
<script type="text/javascript">// <![CDATA[
jQuery.noConflict();
jQuery(document).ready(function() {
    inject_combiner("combiner");
});
// ]]></script>

<form id="combiner_form" method="get"><label for="combiner_input">Moltiplicatore di concetti</label><small class="help_text">Inserisci qui i concetti che preferisci, separati da virgola.</small> <input id="combiner_input" type="text" name="combiner" value="miciola, miao, gattona, bubu" /> <select id="combiner_separator"> <option value=", ">,</option> <option value=" › ">›</option> <option value=" | ">|</option> <option value=" ">(Spazio)</option> </select> <input id="combiner_update" type="submit" value="Aggiorna" />Esempi:

*   [miciola, miao, gattona, bubu](#!)
*   [spengi la playstation, porta fuori la spazzatura, non fai mai un cazzo](#!)
*   [sono stanco, ho lavorato tutto il giorno, dopo apparecchio, dammi un bacio](#!)
Risultati:

1.  Caricamento...
2.  <small>(se non visualizzi la lista butta quel cesso di internet explorer che stai usando)</small>
</form>**Il sistema funziona benissimo, soprattutto durante le liti quotidiane, dove vince chi ha l'ultima parola**.
Quando la vostra amata vi attacca con 3 concetti del tipo "[spengi la playstation, porta fuori la spazzatura, non fai mai un cazzo](#!)" (che generano 7 combinazioni), è essenziale, per stravincere, replicare con almeno 4 concetti del tipo "[sono stanco, ho lavorato tutto il giorno, dopo apparecchio, dammi un bacio](#!)" che generano ben 15 combinazioni e lasciano il vostro coniuge al tappeto con uno straziante 15 a 7!

Ammetto, per onestà intellettuale, di non aver inventato niente di nuovo.
Il grande B. ha costruito la sua carriera politica su un incessante martellamento mediatico basato sulla moltiplicazione di semplici concetti quali [comunisti, giudici politicizzati, sono l'uomo più perseguitato della storia, contro di me solo menzogne](#!), ed il suo avvacato (quello dello [studio legale Mavalà](/2009/12/05/studio-legale-mavala/) lo difende da sacrosante accuse alternando periodi che suonano pressapoco così: "[mavalà, ma cosa dice, è una questione superata, lo sanno tutti che non è così, ho con me gli atti del tribunale](#!)".

Siete liberi di usare il programma come meglio credete (basta scriverci dentro e cliccare su aggiorna), per esempio per scrivere vaccate del tipo:
_"[il mio cazzo, il tuo culo, il mio culo, il tuo cazzo](#!)"._
Il codice sorgente dell'applicazione è rilasciato con licenza creative commons e lo trovate [qui](/wp-content/uploads/statics/js/combiner.js).