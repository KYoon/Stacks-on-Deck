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
