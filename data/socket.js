// core frameworks
var io = require('socket.io')(server);
var _ = require('underscore');
var repo = require('./repository');

// sockets!
io.on('connection', function(socket){
  socket.on("joinRoom", function(data){
    socket.join(data.roomkey, function(error){
      repo.createUser(data.username, data.roomkey);
      repo.getUsers(data.roomkey, function(err, users){
        io.to(data.roomkey).emit("updateClients", users);
      });
      if(error){console.log("error:" + error);}
    });
  });

  socket.on("dealCards", function(){
    var roomKey = socket.rooms[1];
    console.log(roomKey);
    repo.createDeck(roomKey);
    // .done(function(){ 
      repo.dealUsersCard(roomKey, 5, function(err, data){
        console.log(data)
      })
    // })
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