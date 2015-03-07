function updateHand(newHand){
  $("#deal").hide();
  $('#draw-card').show();
  console.log('UPDATING THE HAND')
  hand = newHand;
  $(".player-hand").empty();
  for (var i=0; i<hand.length; i++){
    $(".player-hand").append("<p class='card' id=" + hand[i] + "><a href=#>" + hand[i] + "</a></p>")
  }
}
