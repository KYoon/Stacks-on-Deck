$(document).ready(function() {
  var hand = new Hand();
  hand.render();
  $("body").append(hand.el)
})
