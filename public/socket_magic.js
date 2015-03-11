$(document).ready(function(){
  // connect to room
  socket = io.connect();
  socket.emit("joinRoom", userData);

  // listen for card event
  socket.on("updateHand", updateHand);
  
});

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

  $("#down-arrow").on("click", function(){
    var count = parseInt($("#count").text())
    if (count > 0) {
      $("#count" ).html(count - 1)
    }
  })

  $("#up-arrow").on("click", function(){
    var count = parseInt($("#count").text())
    $("#count").html(count + 1)
  })

  $("#start-game-btn").on("click", function() {
    var dealingCount = parseInt($("#count").text())
    // var faceDown = $("#facedown").is(':checked');
    dealCards({dealingCount: dealingCount});
  })
});

function cardColor(suit){
  var color;
  switch(suit) {
    case "diams":
      color = "red";
      break;
    case "spades":
      color = "black";
      break;
    case "hearts":
      color = "red";
      break;
    case "clubs":
      color = "black";
      break;
  }
  return color
}

function dealCards(data){
  socket.emit("dealCards", data);
}

function joinedGame(data) {
  playerList.addPlayers(data);
  playerListForPassing.addPlayers(data);
}
function newPlayer(data) {
  playerList.addPlayer(data);
  playerListForPassing.addPlayer(data)
}
function removeCurrentUser(clients, currentUser) {
  peers = []
  for (var i=0; i < clients.length; i++){
    if (clients[i] !== currentUser) {
      peers.push(clients[i])
    }
  }
  return peers;
}
function updateClients(clients){
  // playerList.updatePlayers(clients);
  // playerListForPassing.updatePlayers(removeCurrentUser(clients, userData.username));
  
  // playerListView.render();
  playerListViewForPassing.render();
}
function updateHand(data){
  $(".dealing-cards").hide();
  $('#draw-card').show();
  $(".waiting-room").remove();
  $(".active-game").show();
  $(".table-container").css( "height", "280px")
  hand.updateCards(data)
}
