$(document).ready(function(){
  var toUser = "";

  // JQuery Calls
  // $("form").on("submit", function(e){
  //   e.preventDefault();
  //   var dealingCount = $(this).find("#initial-deal-count").val();
  //   var faceDown = $("#facedown").is(':checked');
  //   dealCards({dealingCount: dealingCount, cardAppearance: faceDown});
  // });
 $(document).on("click", "#passing-player-list", function(e){
    e.preventDefault();
    var id = hand.activeCard.id;
    toUser = $(this).attr("id")
    socket.emit("passCard", {toUser: toUser, cardId: id})
  });

  //Table Buttons
   $(document).on("click", "#table-draw-card", function(){
      socket.emit("tableDeckDraw")
  });

 $(document).on("click", "#table-discard-card", function(e){
    e.preventDefault;
    cardId = table.activeCard.attributes.id
      socket.emit("discardTableCard", cardId);
  });

 $(document).on("click", "#table-get-card", function(e){
    e.preventDefault;
    cardId = table.activeCard.attributes.id
    socket.emit("getTableCard", cardId);
  });

 $(document).on("click", "#collect-table-cards", function(e){
    e.preventDefault;
    socket.emit("userCollectsTable");
  });

  //Hand Buttons
  $(document).on("click", "#draw-card", function(){
    socket.emit("drawCard")
  });
 $(document).on("click", "#hand-discard-button", function(){
    hand.discard();
  });

 $(document).on("click", "#hand-play-button", function(){
    hand.playCard();
  });

  // $("#hand-pass-button")."click"(function(){
  //   $(".passing-player-list").show();
  // });

 $(document).on("click", ".user", function(e){
    e.preventDefault();
    $(".pass-list").hide();
  });

  // $(".passing-player-list")."click"(function(e){
  // })

  $(document).on("click", "#down-arrow", function(){
    var count = parseInt($("#count").text())
    if (count > 0) {
      $("#count" ).html(count - 1)
    }
  });

  $(document).on("click", "#up-arrow", function(){
    var count = parseInt($("#count").text())
    $("#count").html(count + 1)
  });

  $(document).on("click", "#start-game-btn", function() {
    var dealingCount = parseInt($("#count").text())
    // var faceDown = $("#facedown").is(':checked');
    dealCards({dealingCount: dealingCount});
  });

 $(document).on("click", ".table-buttons", function(){
    $(".table-buttons div").hide();
  });
});
