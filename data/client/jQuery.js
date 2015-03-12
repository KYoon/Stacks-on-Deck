$(document).ready(function(){
  var toUser = "";

  // JQuery Calls
  // $("form").on("submit", function(e){
  //   e.preventDefault();
  //   var dealingCount = $(this).find("#initial-deal-count").val();
  //   var faceDown = $("#facedown").is(':checked');
  //   dealCards({dealingCount: dealingCount, cardAppearance: faceDown});
  // });

  $(".passing-player-list").on("click", ".pass-to", function(e){
    e.preventDefault();
    var id = hand.activeCard.id;
    toUser = $(this).attr("id")
    socket.emit("passCard", {toUser: toUser, cardId: id})
  });

  //Table Buttons
  $("#table-draw-card").click(function(){
      socket.emit("tableDeckDraw")
  });

  $("#table-discard-card").click(function(e){
    e.preventDefault;
    cardId = table.activeCard.attributes.id
      socket.emit("discardTableCard", cardId);
  });

  $("#table-get-card").click(function(e){
    e.preventDefault;
    cardId = table.activeCard.attributes.id
    socket.emit("getTableCard", cardId);
  });

  $("#collect-table-cards").click(function(e){
    e.preventDefault;
    socket.emit("userCollectsTable");
  });

  //Hand Buttons
  $("#draw-card").click(function(){
    socket.emit("drawCard")
  });

  $("#hand-discard-button").click(function(){
    hand.discard();
  });

  $("#hand-play-button").click(function(){
    hand.playCard();
  });

  // $("#hand-pass-button").click(function(){
  //   $(".passing-player-list").show();
  // });

  $(".user").click(function(e){
    e.preventDefault();
    console.log("i got clicked")
    $(".pass-list").hide();
  });

  $(".passing-player-list").click(function(e){
    console.log("fuck you, i got clicked")
  })

  $("#down-arrow").on("click", function(){
    var count = parseInt($("#count").text())
    if (count > 0) {
      $("#count" ).html(count - 1)
    }
  });

  $("#up-arrow").on("click", function(){
    var count = parseInt($("#count").text())
    $("#count").html(count + 1)
  });

  $("#start-game-btn").on("click", function() {
    var dealingCount = parseInt($("#count").text())
    // var faceDown = $("#facedown").is(':checked');
    dealCards({dealingCount: dealingCount});
  });

  $(".table-buttons").on("click", function(){
    $(".table-buttons div").hide();
  });
});
