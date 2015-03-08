function updateTable(tableCards){
  console.log(tableCards);
  console.log('GETTING HERE to updateTable')
  var formattedTable = formatHand(tableCards);
  table.updateCards(formattedTable)
  tableView.render();
}
