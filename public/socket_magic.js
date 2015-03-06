$(document).ready(function(){
  var hand = []

  socket = io.connect();
  socket.emit("joinRoom", userData);

  socket.on("updateHand", updateHand)

  socket.on("message", messageReception);

  socket.on("updateClients", updateUserList);

  function updateHand(newHand){
    hand = newHand
  }

  function messageReception(message){
    console.log(message);
  }

  function updateUserList(clients){
    console.log(clients);
  }

})

