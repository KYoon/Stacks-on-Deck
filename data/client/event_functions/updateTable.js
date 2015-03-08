function updateTable(tableCards){
  console.log(tableCards);
  console.log('GETTING HERE to updateTable')
  var formattedHand = formatHand(tableCards);
  // $(".table").empty();
  // if (hand.length > 0){
  //   $("#collect-table-cards").show();
  //   for (var i=0; i<hand.length; i++){
  //     $(".table").append("<p class='card' id=" + hand[i] + "><a href=#>" + hand[i] + "</a></p>")
  //   }
  // }
  // else {
  //   $("#collect-table-cards").hide();
  // }
  tableOfCards = []
  for(var i=0; i< formattedHand.length; i++) {
    createdCard = new Card(formattedHand[i]);
    cardView = new CardView(createdCard);
    tableOfCards.push(createdCard);
  }
  var createdTable = new Hand(tableOfCards)
  var tableView = new HandView({collection: tableOfCards})
  tableView.addAll();
  $("table").empty()
  $("table").append(tableView.$el)
}
