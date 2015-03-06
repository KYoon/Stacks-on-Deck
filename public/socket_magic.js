$(document).ready(function(){
  var hand = []

  socket = io.connect();
  socket.emit("joinRoom", userData);

  socket.on("updateHand", updateHand)

  socket.on("message", messageReception);

  socket.on("updateClients", updateUserList);

  $("#deal").click(dealCards)

  function messageReception(message) {
    $(".player-list").append("<li>" + message.username + "</li>")
    $("#roomkey").html(message.roomkey)
  }

  function dealCards(){
    socket.emit("dealCards");
  }

  function updateHand(newHand){
    hand = newHand;
    console.log(hand);
    for (i=0; i<hand.length; i++){
      $(".player-hand").append("<p>" + hand[i].value + " of " + hand[i].suit + "</p>")  
    }
  }

  function updateUserList(clients){
    console.log(clients);
  }

})

