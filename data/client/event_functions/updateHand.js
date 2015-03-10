function updateHand(data){
  $(".dealing-cards").hide();
  $('#draw-card').show();
  $(".waiting-room").remove();

  hand.updateCards(data)
  handView.render();
}
