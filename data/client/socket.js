$(document).ready(function(){
  // connect to room
  socket = io.connect();
  socket.emit("joinRoom", userData);

  // listen for event
  socket.on("updateHand", updateHand);
  socket.on("updateClients", updateUserList);
  socket.on("updateTable", updateTable);

});
