$(document).ready(function(){
  // connect to room
  socket = io.connect();
  socket.emit("joinRoom", userData);

  // listen for card event
  socket.on("updateHand", updateHand);

  // listen for player joining late
  socket.on("playerJoiningLate", playerJoiningLate);

  // if game in progress, notify and redirect after 3 seconds
  socket.on("gameInProgress", function(){
    console.log("ERROR: received gameInProgess response")
    $.notify({
      icon: "glyphicon glyphicon-minus-sign",
      title: "Game in Progress: ",
      message: "The game has already started, you will now be redirected to the home page."
    });
    setTimeout(function(){
      window.location.replace("/");
    }, 3000)
  });
});
