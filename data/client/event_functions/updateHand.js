function updateHand(data){
  $(".dealing-cards").hide();
  $('#draw-card').show();

  hand.updateCards(data)
  handView.render();
}
