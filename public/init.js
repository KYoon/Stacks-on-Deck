$(document).ready(function() {
  hand = new Hand();
  handView = new HandView(hand);
  $(".player-hand").append(handView.$el);
})
