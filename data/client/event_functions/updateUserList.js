function updateUserList(clients){
  // $(".player-list").empty();
  // $(".passing-player-list").empty();
  
 listOfPlayers = [];
  listOfPassToPlayers = [];
  for (var i=0; i<clients.length; i++){
    createdPlayer = new Player({username: clients[i], playerTemplateType: "player"});
    listOfPlayers.push(createdPlayer);

    if (clients[i] !== userData.username) {
      passingPlayer = new Player({username: clients[i], playerTemplateType: "passingPlayer"});
      listOfPassToPlayers.push(passingPlayer);
    }
  }
  playerListView = new PlayerListView({collection: listOfPlayers})
  playerListView.addAll();

  playerListViewForPassing = new PlayerListView({collection: listOfPassToPlayers})
  playerListViewForPassing.addAll();

  $(".player-list").append(playerListView.$el);
  $(".passing-player-list").append(playerListViewForPassing.$el);
}