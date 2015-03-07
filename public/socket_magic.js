$(document).ready(function(){
  var hand = [];
  var toUser = "";
  var passingCard = "";

  socket = io.connect();

  socket.emit("joinRoom", userData);

  socket.on("updateHand", updateHand);
  socket.on("updateClients", updateUserList);
  socket.on("passCard", passCardToUser)

  // JQuery Calls
  $("#deal").click(function(){
    socket.emit("dealCards");
  });

  $(".player-hand").on("click", ".card", function(e){
    e.preventDefault();
    $("#pass-card").show();
    passingCard = $(this).attr('id');
    console.log("CARD CLICKED");
  });

  $("#pass-card").click(function(){
    $(".passing-player-list").show();
    console.log("PASS CARD BUTTON CLICKED")
  })

  $(".passing-player-list").on("click", ".user", function(e){
    e.preventDefault();
    toUser = $(this).attr('id')
    console.log(toUser)
    console.log(passingCard)
    socket.emit("passCard", {toUser: toUser, passingCard: passingCard})
  })

  // Socket functions (???right name)
  function dealCards(){
    socket.emit("dealCards");
  }

  function updateHand(newHand){
    $("#deal").hide();
    hand = newHand;
    console.log(hand);
    $(".player-hand").empty();
    for (var i=0; i<hand.length; i++){
      $(".player-hand").append("<p class='card' id=" + hand[i] + "><a href=#>" + hand[i] + "</a></p>")  
    }
  }

  function updateUserList(clients){
    console.log(clients);
    $(".player-list").empty();
    for (var i=0; i<clients.length; i++){
      $(".player-list").append("<li>" + clients[i] + "</li>");
      $(".passing-player-list").append("<li class='user' id=" + clients[i] +"><a href=#>" + clients[i] + "</a></li>");
    }
  }

  function passCardToUser(){

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
