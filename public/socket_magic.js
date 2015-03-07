$(document).ready(function(){
  var hand = []

  socket = io.connect();
  socket.emit("joinRoom", userData);

  socket.on("updateHand", updateHand)

  socket.on("updateClients", updateUserList);

  $("#deal").click(function(){
    $("#deal").hide();
    dealCards;
  });

  function dealCards(){
    socket.emit("dealCards");
  }

  function updateHand(newHand){
    hand = newHand;
    console.log(hand);
    for (var i=0; i<hand.length; i++){
      $(".player-hand").append("<p><a href=#>" + hand[i] + "</a></p>")  
    }
  }

  function updateUserList(clients){
    console.log(clients);
    $(".player-list").empty();
    for (var i=0; i<clients.length; i++){
      $(".player-list").append("<li>" + clients[i] + "</li>");
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
