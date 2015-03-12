$(document).ready(function() {
  if (userData) {
    headerView = new HeaderView();
    headerView.render();
    $(".sweet-container").prepend(headerView.$el);
  }
  // add the hand view
  hand = new Hand();
  handView = new HandView({collection: hand});
  $(".player-hand").append(handView.$el);

  // add the table view
  table = new Table();
  tableView = new TableView({collection: table});
  $(".tableclass").append(tableView.$el);

  // add the current player list view
  playerList = new PlayerList();
  playerListView = new CurrentPlayersView({collection: playerList});
  $(".player-list").append(playerListView.$el);

  // add the pass to player list view
  playerListForPassing = new PlayerList();
  playerListViewForPassing = new PassingPlayersView({collection: playerListForPassing});
  $(".passing-player-list").append(playerListViewForPassing.$el);

  // add table buttons to table view

  // add hand buttons to table
  handButtonView = new HandButtonView({collection: hand});
  $(".hand-buttons-view").append(handButtonView.$el);

  // instantiate message view
  messageView = new MessageView();
})
