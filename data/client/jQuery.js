$(document).ready(function(){
  // var hand = [];
  var toUser = "";
  var passingCard = "";

  // JQuery Calls
  $("form").on("submit", function(e){
    e.preventDefault();
    var dealingCount = $(this).find("#initial-deal-count").val();
    var faceDown = $("#facedown").is(':checked');
    dealCards({dealingCount: dealingCount, cardAppearance: faceDown});
  });

  $(".player-hand").on("click", ".card", function(e){
    e.preventDefault();
    $("#pass-card").show();
    $("#pass-table").show();
    passingCard = hand.activeCard;
    $("#discard-card").show();
  });

  $("#pass-card").click(function(){
    $(".passing-player-list").show();
  })

  $("#pass-table").click(function(){
    // console.log(passingCard.attributes);
    // var suit = passingCard.attributes.suit;
    // var value = passingCard.attributes.value;
    var id = passingCard.attributes.id;

    console.log("GETTING HERE FOOL")
    socket.emit("passTable", id)
  })

  $(".passing-player-list").on("click", ".pass-to", function(e){
    e.preventDefault();
    var id = passingCard.attributes.id;

    toUser = $(this).attr("id")
    console.log("toUser")
    console.log(toUser)
    socket.emit("passCard", {toUser: toUser, cardId: id})
  })

  $("#draw-card").click(function(){
    socket.emit("drawCard")
  })

  $("#discard-card").click(function(){
    var cardId = passingCard.attributes.id;
    socket.emit("userDiscardsCard", cardId);
    $("#pass-card").hide();
    $("#pass-table").hide();
    $("#discard-card").hide();
  })


});
