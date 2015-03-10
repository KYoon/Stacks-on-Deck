$(document).ready(function(){
  // connect to room
  socket = io.connect();
  socket.emit("joinRoom", userData);

  // listen for card event
  socket.on("updateHand", updateHand);
  socket.on("updateTable", updateTable);
  
});

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

function dealCards(dealingCount){
  socket.emit("dealCards", dealingCount);
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


  hand.updateCards(data)
  handView.render();
}

function updateTable(tableCards){
  console.log(tableCards)
  // var formattedTable = formatHand(tableCards);
  table.updateCards(tableCards)
  tableView.render();

  if (tableCards.length > 0){
    $("#collect-table-cards").show();
  }
  else {
    $("#collect-table-cards").hide();
  }
  $("#pass-card").hide();
  $("#pass-table").hide();
}
