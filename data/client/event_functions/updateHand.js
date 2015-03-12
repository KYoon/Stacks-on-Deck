function updateHand(data){
  $(".container-fluid").hide();
  $(".dealing-cards").hide();
  $('.draw-card-buttons').show();
  $(".waiting-room").remove();
  $(".active-game").show();
  $(".player-hand").show();
  hand.updateCards(data)
}
