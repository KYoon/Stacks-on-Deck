$(document).ready(function() {
  if (userData) {
    headerView = new HeaderView();
    headerView.render();
    $("body").prepend(headerView.$el);
  }
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

  // add the pass to player list view
  playerListForPassing = new PlayerList();
  playerListViewForPassing = new PlayerListView();
  $(".passing-player-list").append(playerListViewForPassing.$el);
})
