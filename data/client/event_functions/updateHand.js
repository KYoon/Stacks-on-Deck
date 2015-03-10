function updateHand(data){
  $(".dealing-cards").hide();
  $('#draw-card').show();
  $(".waiting-room").remove();
  $(".active-game").show();
  $(".table-container").css( "height", "280px")
  hand.updateCards(data)
}
