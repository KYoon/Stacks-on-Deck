function updateTable(tableCards){
  console.log(tableCards);
  console.log('GETTING HERE to updateTable')
  hand = tableCards;
  $(".table").empty();
  if (hand.length > 0){
    $("#collect-table-cards").show();
    for (var i=0; i<hand.length; i++){
      $(".table").append("<p class='card' id=" + hand[i] + "><a href=#>" + hand[i] + "</a></p>")
    }
  }
  else {
    $("#collect-table-cards").hide();
  }
}
