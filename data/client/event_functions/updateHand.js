function updateHand(hand){
  $("#deal").hide();
  $('#draw-card').show();
  var formattedHand = formatHand(hand)
  handOfCards = []
  for(var i=0; i<formattedHand.length; i++) {
    createdCard = new Card(formattedHand[i]);
    cardView = new CardView(createdCard);
    handOfCards.push(createdCard);
  }
  var createdHand = new Hand(handOfCards)
  var handView = new HandView({collection: handOfCards})
  handView.addAll();
  $(".player-hand").empty()
  $(".player-hand").append(handView.$el)
}
