$(document).ready(function(){
  var hand = []

  socket = io.connect();
  socket.emit("joinRoom", userData);

  socket.on("updateHand", updateHand)

  socket.on("message", messageReception);

  socket.on("updateClients", updateUserList);

  $("#deal").click(dealCards)

  function dealCards(){
    socket.emit("dealCards");
  }

  function updateHand(newHand){
    hand = newHand;
    console.log(hand);
  }

  function messageReception(message){
    console.log(message);
  }

  function updateUserList(clients){
    console.log(clients);
  }

})

