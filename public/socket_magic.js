$(document).ready(function(){
  var hand = []

  socket = io.connect();
  socket.emit("joinRoom", userData);

  socket.on("updateHand", updateHand)

  socket.on("updateClients", updateUserList);

  $("#deal").click(dealCards);

  function dealCards(){
    socket.emit("dealCards");
  }

  function updateHand(newHand){
    hand = newHand;
    console.log(hand);
    for (var i=0; i<hand.length; i++){
      $(".player-hand").append("<p>" + hand[i] + "</p>")  
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

