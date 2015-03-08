$(document).ready(function() {
  var hand = new HandView();
  hand.render();
  $("body").append(hand.el)
})
