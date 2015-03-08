function updateUserList(clients){
  $(".player-list").empty();
  $(".passing-player-list").empty();
  
  listOfPlayers = [];
  for (var i=0; i<clients.length; i++){
    createdPlayer = new Player({username: clients[i]});
    playerView = new PlayerView(createdPlayer)
    listOfPlayers.push(createdPlayer);
  }
  createdPlayerList = new PlayerList(listOfPlayers)
  playerListView = new PlayerListView({collection: listOfPlayers})
  playerListView.addAll();

  $(".player-list").append(playerListView.$el);
//   $(".passing-player-list").append("<li class='user' id=" + clients[i] +"><a href=#>" + clients[i] + "</a></li>");
// 
}
