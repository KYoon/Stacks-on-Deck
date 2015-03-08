function updateDiscardPile(cards){
  hand = cards;
  $(".discard-pile").empty();
  for (var i=0; i<hand.length; i++){
    $(".discard-pile").append("<p class='card' id=" + hand[i] + "><a href=#>" + hand[i] + "</a></p>")
  }
  $("#pass-card").hide();
  $("#pass-table").hide();
  $("#discard-card").hide();
}