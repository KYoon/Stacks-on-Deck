$(document).ready(function(){
  var socket = io.connect();
  socket.emit("joinRoom", userData);

  socket.on("message", messageReception);

  socket.on("cardsDeal", cardsReception);

  socket.on("cardReceive", cardReception);

  socket.on("peerUpdate", updateUserList);

  function messageReception(message){
    console.log(message);
  }

  function updateUserList(clients){
    console.log(clients);
  }

  function cardsReception(cards) {

  }

  function cardReception(card) {

  }


})

