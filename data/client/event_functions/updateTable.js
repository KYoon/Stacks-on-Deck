function updateTable(tableCards){
  var formattedTable = formatHand(tableCards);
  table.updateCards(formattedTable)
  tableView.render();

  if (tableCards.length > 0){
    $("#collect-table-cards").show();
  }
  else {
    $("#collect-table-cards").hide();
  }
  $("#pass-card").hide();
  $("#pass-table").hide();
}
