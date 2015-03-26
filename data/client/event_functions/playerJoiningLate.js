function playerJoiningLate(data){
  gameRoomView.render();

  hand = new Hand();
  handView = new HandView({collection: hand});
  $(".player-hand").append(handView.$el);

  table = new Table();
  tableView = new TableView({collection: table});
  $(".tableclass").append(tableView.$el);

  // add hand buttons to table
  handButtonView = new HandButtonView({collection: hand});

  table.updateCards(data)
}