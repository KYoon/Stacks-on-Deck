// core frameworks
var io = require('socket.io')(server);
var _ = require('underscore');

function getAllUsers(roomkey){
  // console.log("printing people in da room")
  // console.log(io.sockets.adapter.rooms[roomkey])
  // var clients = io.clients(roomkey);
  // return clients;
  // THIS WILL BE CALLED FROM THE METHODS FROM REDIS
}

// sockets!
io.on('connection', function(socket){
  socket.on("joinRoom", function(data){
    socket.join(data.roomkey, function(error){
      io.to(data.roomkey).emit("message", {username: data.username, roomkey: data.roomkey});
      if(error){console.log("error:" + error);}
    });
  });

  socket.on("dealCards", function(data){
    // stubbed to only work on one person
    socket.emit("updateHand", randomHand(5));
  });

});

// function randomHand(quantity){
//   var newHand = []
//   for(var i=0; i < quantity; i++ ){
//     newHand.push(randomCard())
//   }
//   return newHand;
// }

// function randomCard(){
//   var suits = ["hearts", "clubs", "spades", "diamonds"];
//   var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
//   return {suit:_.sample(suits), value: _.sample(values)};
// }