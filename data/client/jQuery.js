$(document).ready(function(){
  // var hand = [];
  var toUser = "";
  var passingCard = "";

  // JQuery Calls
  $("form").on("submit", function(e){
    e.preventDefault();
    var dealingCount = $(this).find("#initial-deal-count").val();
    dealCards(dealingCount);
  });

  $(".player-hand").on("click", ".card", function(e){
    e.preventDefault();
    $("#pass-card").show();
    $("#pass-table").show();
    passingCard = hand.activeCard.toString();
    $("#discard-card").show();
  });

  $("#pass-card").click(function(){
    $(".passing-player-list").show();
  })

  $("#pass-table").click(function(){
    socket.emit("passTable", passingCard)
  })

  $(".passing-player-list").on("click", "li", function(e){
    e.preventDefault();
    toUser = $(this).attr('username')
    socket.emit("passCard", {toUser: toUser, passingCard: passingCard})
  })

  $("#draw-card").click(function(){
    socket.emit("drawCard")
  })

  $("#discard-card").click(function(){
    $("#pass-card").hide();
    $("#pass-table").hide();
    $("#discard-card").hide();
  })


});
