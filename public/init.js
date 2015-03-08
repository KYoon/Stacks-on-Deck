$(document).ready(function() {
  hand = new Hand();
  table = new Table();
  tableView = new TableView(table);
  handView = new HandView(hand);
  $(".player-hand").append(handView.$el);
  $(".tableclass").append(tableView.$el);
  
})
