function updateHand(newHand){
  $("#deal").hide();
  $('#draw-card').show();
  console.log('UPDATING THE HAND')
  hand = newHand;
  $(".player-hand").empty();
  for (var i=0; i<hand.length; i++){
    $(".player-hand").append("<p class='card' id=" + hand[i] + "><a href=#>" + hand[i] + "</a></p>")
  }
  var formattedHand = formatHand(hand)
    handOfCards = []
    for(var i=0; i<formattedHand.length; i++) {
      createdCard = new Card(formattedHand[i]);
      console.log(formattedHand[i])
      cardView = new CardView(formattedHand[i])
      cardView.render()
      console.log(createdCard);
      handOfCards.push(createdCard);
    }
    createdHand = new Hand(handOfCards)
}
