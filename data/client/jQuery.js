$(document).ready(function(){
  var hand = [];
  var toUser = "";
  var passingCard = "";

  // JQuery Calls
  $("#deal").click(dealCards);

  $(".player-hand").on("click", ".card", function(e){
    e.preventDefault();
    $("#pass-card").show();
    $("#pass-table").show();
    passingCard = $(this);
    console.log(passingCard)
  });

  $("#pass-card").click(function(){
    $(".passing-player-list").show();
  })

  // $("#pass-table").click(function(){
  //   socket.emit("passTable", passingCard)
  // })

  $(".passing-player-list").on("click", ".user", function(e){
    e.preventDefault();
    toUser = $(this).attr('id')
    socket.emit("passCard", {toUser: toUser, passingCard: passingCard})
  })

  $("#draw-card").click(function(){
    socket.emit("drawCard")
  })

  $("#collect-table-cards").click(function(){
    socket.emit("userCollectsTable")
  })

});
