$(document).ready(function(){
  // var hand = [];
  var toUser = "";
  var passingCard = "";

  // JQuery Calls
  $("form").on("submit", function(e){
    e.preventDefault();
    console.log("clickin")
    var dealingCount = $(this).find("#initial-deal-count").val();
    dealCards(dealingCount);
  });

  $(".player-hand").on("click", ".card", function(e){
    e.preventDefault();
    $("#pass-card").show();
    $("#pass-table").show();
    // passingCard = $(this)
    console.log(hand.activeCard);
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
    console.log(this);
    console.log(toUser);
    console.log(passingCard);
    socket.emit("passCard", {toUser: toUser, passingCard: passingCard})
  })

  $("#draw-card").click(function(){
    socket.emit("drawCard")
  })

  $("#collect-table-cards").click(function(){
    socket.emit("userCollectsTable")
  })

  $("#discard-card").click(function(){
    socket.emit("userDiscardsCard", passingCard);
  })

  $(".table").on("click", ".card", function(e){
    e.preventDefault();
    $(".table-buttons").show();
    passingCard = $(this).attr('id');
  })

  $("#table-get-card").click(function(){
    socket.emit("getTableCard", passingCard);
  })

  $("#table-discard-card").click(function(){
    socket.emit("discardTableCard", passingCard);
  })

});
