$(document).ready(function() {
  if (userData) {
    headerView = new HeaderView();
    headerView.render();
    $(".sweet-container").prepend(headerView.$el);
  }
  //Wait room
  waitingRoomView = new WaitingRoomView();
  $(".all-game-container").append(waitingRoomView.$el);
  
  //Game room 
  gameRoomView = new GameRoomView();
  $(".all-game-container").append(gameRoomView.$el);
  

  // add the current player list view
  playerList = new PlayerList();
  playerListView = new CurrentPlayersView({collection: playerList});
  

  // instantiate message view
  messageView = new MessageView();

})
