$(document).ready(function() {
  // add the hand view
  hand = new Hand();
  handView = new HandView(hand);
  $(".player-hand").append(handView.$el);
  
  // add the table view
  table = new Table();
  tableView = new TableView(table);
  $(".tableclass").append(tableView.$el);
  
  // add the player list view
  playerList = new PlayerList();
  playerListView = new PlayerListView();
  $(".player-list").append(playerListView.$el);

})
