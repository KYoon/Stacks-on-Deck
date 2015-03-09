function updateHand(data){
  $(".dealing-cards").hide();
  $('#draw-card').show();

  // changing redis strings to JSON
  var formattedCards = formatHand(data)
  hand.updateCards(formattedCards)
  // re-render view
  handView.render();
}
