$(document).ready(function() {

  // instantiate table views
  table = new Table();
  tableView = new TableView({collection: table});
  $(".tableclass").append(tableView.$el);

  // instantiate message view
  messageView = new MessageView();

  // listen for drag
  socket.on("addCardToTable", function(){
    $(".single-card").draggable();
  });

})
