$(document).ready(function(){
  // connect to room
  socket = io.connect();
  socket.emit("joinRoom", userData);

  // listen for card event
  socket.on("updateHand", updateHand);

  // if game in progress, notify and redirect after 3 seconds
  socket.on("gameInProgress", function(){
    console.log("ERROR: received gameInProgess response")
    $.notify({
      icon: "glyphicon glyphicon-minus-sign",
      title: "Game in Progress: ",
      message: "The game has already started, you will now be redirected to the home page."
    });
    setTimeout(function(){
      window.location.replace("/");
    }, 3000)
  });
});

$(document).ready(function(){
  var toUser = "";

 $(document).on("click", ".show-passing-player-list", function(e){
    e.preventDefault();
    $(".pass-list").slideDown(300);
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

 $(document).on("click", ".pass-to", function(e){
    e.preventDefault();
    var id = hand.activeCard.id;
    toUser = $(this).attr("id")
    $(".pass-list").hide();
    socket.emit("passCard", {toUser: toUser, cardId: id})
  });

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
    dealCards({dealingCount: dealingCount});
  });

 $(document).on("click", ".table-buttons", function(){
    $(".table-buttons div").hide();
  });

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

  gameRoomView.render();

  hand = new Hand();
  handView = new HandView({collection: hand});
  $(".player-hand").append(handView.$el);

  // add the table view
  table = new Table();
  tableView = new TableView({collection: table});
  $(".tableclass").append(tableView.$el);



  // add table buttons to table view

  // add hand buttons to table
  handButtonView = new HandButtonView({collection: hand});
  // $(".hand-buttons-view").append(handButtonView.$el);

  
  // $(".active-game").show();
  // $(".player-hand").show();
  hand.updateCards(data)


}
