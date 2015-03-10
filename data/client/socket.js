$(document).ready(function(){
  // connect to room
  socket = io.connect();
  socket.emit("joinRoom", userData);

  // listen for card event
  socket.on("updateHand", updateHand);
  socket.on("updateTable", updateTable);
  // socket.on("addCardToHand", addCardToHand)
  
});
