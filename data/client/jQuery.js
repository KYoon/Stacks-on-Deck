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

  $("#draw-card").click(function(){
    socket.emit("drawCard")
  });

  $(".down-arrow").on("click", function(){
    var count = parseInt($("#count").text())
    if (count > 0) {
      $("#count" ).html(count - 1)
    }
  })

  $(".up-arrow").on("click", function(){
    var count = parseInt($("#count").text())
    $("#count").html(count + 1)
  })

  $("#start-game-btn").on("click", function() {
    var dealingCount = parseInt($("#count").text())
    // var faceDown = $("#facedown").is(':checked');
    dealCards({dealingCount: dealingCount});
  })
});
