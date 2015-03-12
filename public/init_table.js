$(document).ready(function() {

  table = new Table();
  tableView = new TableView({collection: table});
  $(".tableclass").append(tableView.$el);

  // listen for drag
  socket.on("addCardToTable", function(){
    $(".single-card").draggable();
  });

})
