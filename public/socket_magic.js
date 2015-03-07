$(document).ready(function(){
  var hand = [];
  var toUser = "";
  var passingCard = "";

  socket = io.connect();

  socket.emit("joinRoom", userData);

  socket.on("updateHand", updateHand);
  socket.on("updateClients", updateUserList);
  socket.on("updateTable", updateTable)

  // JQuery Calls
  $("#deal").click(function(){
    socket.emit("dealCards");
  });

  $(".player-hand").on("click", ".card", function(e){
    e.preventDefault();
    $("#pass-card").show();
    $("#pass-table").show();
    passingCard = $(this).attr('id');
  });

  $("#pass-card").click(function(){
    $(".passing-player-list").show();
  })

  $("#pass-table").click(function(){
    socket.emit("passTable", passingCard)
  })

  $(".passing-player-list").on("click", ".user", function(e){
    e.preventDefault();
    toUser = $(this).attr('id')
    socket.emit("passCard", {toUser: toUser, passingCard: passingCard})
  })

  $("#draw-card").click(function(){
    socket.emit("drawCard")
  })

  $("#collect-table-cards").click(function(){
    socket.emit("userCollectsTable")
  })

  // Socket functions (???right name)
  function dealCards(){
    socket.emit("dealCards");
  }

  function updateHand(newHand){
    $("#deal").hide();
    $('#draw-card').show();
    console.log('UPDATING THE HAND')
    hand = newHand;
    $(".player-hand").empty();
    for (var i=0; i<hand.length; i++){
      $(".player-hand").append("<p class='card' id=" + hand[i] + "><a href=#>" + hand[i] + "</a></p>")  
    }
  }

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

  function updateUserList(clients){
    console.log(clients);
    $(".player-list").empty();
    $(".passing-player-list").empty();
    for (var i=0; i<clients.length; i++){
      $(".player-list").append("<li>" + clients[i] + "</li>");
      $(".passing-player-list").append("<li class='user' id=" + clients[i] +"><a href=#>" + clients[i] + "</a></li>");
    }
  }

})

function formatCard(cardname) {
  card = {};
  if(/diamonds/.test(cardname)) {
    card.suit = cardname.slice(0,8);
    card.value = cardname.slice(8);
  } else if (/hearts/.test(cardname)) {
    card.suit = cardname.slice(0,6);
    card.value = cardname.slice(6);
  } else if (/clubs/.test(cardname)) {
    card.suit = cardname.slice(0,5);
    card.value = cardname.slice(5);
  } else if(/spades/.test(cardname)) {
    card.suit = cardname.slice(0,6);
    card.value = cardname.slice(6);
  }
  return card;
}
