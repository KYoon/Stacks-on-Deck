// Core frameworks
var io = require('socket.io')(server);
var _ = require('underscore');
var repo = require('./repository');

// Sockets!
io.on('connection', function(socket){

  // User enters room
  socket.on("joinRoom", function(data){
    socket.join(data.roomkey, function(error){
      socket.username = data.username;
      repo.createUser(data.roomkey, data.username, socket.id);
      repo.getUsers(data.roomkey, function(err, users){
        socket.emit("joinedGame", users);
      });
      socket.broadcast.to(data.roomkey).emit('newPlayer', data.username);
      if(error){console.log("error:" + error);}
    });
  });

  // Deal cards to all users in a room
  socket.on("dealCards", function(data){
    var roomKey = socket.rooms[1];
    repo.createDeck(roomKey);
    repo.dealUsersCards(roomKey, parseInt(data.dealingCount));
    socket.broadcast.to(roomKey).emit("cardsDealMessage", socket.username, data.dealingCount)
    updateAllUserHands(roomKey);
  });

  // Pass a card from one user to another
  socket.on("passCard", function(data){
    var roomKey = socket.rooms[1];
    var username = socket.username
    repo.passCard(roomKey, username, data.toUser, data.cardId, function(card){
      var card = JSON.parse(card);
      socket.emit("removeCardFromHand", card);
      repo.getKey(roomKey, data.toUser, function(err, key){
        io.to(key).emit("addCardToHand", card);
      });
    });
  });

  // Draw a card from the deck
  socket.on("drawCard", function(){
    var roomKey = socket.rooms[1];
    var username = socket.username;
    repo.dealUserCard(roomKey, username, function(card) {
      var card = JSON.parse(card);
      socket.broadcast.to(roomKey).emit("cardDrawMessage", socket.username);
      socket.emit("addCardToHand", card);
    });
  });

  // Pass a card to the table from the user's hand
  socket.on("passTable", function(cardId){
    var roomKey = socket.rooms[1];
    var username = socket.username;
    repo.passCard(roomKey, username, "Table", cardId, function(card){
      var card = JSON.parse(card);
      socket.emit("removeCardFromHand", card);
      io.to(roomKey).emit("addCardToTable", card);
    });
  });

  // User collects all the cards on the table
  socket.on("userCollectsTable", function(){
    var roomKey = socket.rooms[1];
    var username = socket.username;
    var socketId = socket.id;
    repo.getTable(roomKey, username, function(card){
      var card = JSON.parse(card);
      socket.emit("addCardToHand", card);
      io.to(roomKey).emit("removeCardFromTable", card);
    });
  });

  // User discards a card from his/her hand
  socket.on("userDiscardsCard", function(cardId){
    var roomKey = socket.rooms[1];
    var username = socket.username;
    var socketId = socket.id;
    repo.passCard(roomKey, username, "Discard", cardId, function(card){
      var card = JSON.parse(card);
      socket.emit("removeCardFromHand", card);
    });
  });

  // User obtains a card from a table
  socket.on("getTableCard", function(cardId){
    var roomKey = socket.rooms[1];
    var username = socket.username;
    var socketId = socket.id;
    repo.passCard(roomKey, "Table", username, cardId, function(card){
      var card = JSON.parse(card);
      socket.emit("addCardToHand", card);
      io.to(roomKey).emit("removeCardFromTable", card);
    });
  });

  // Discard a card from the table
  socket.on("discardTableCard", function(cardId){
    var roomKey = socket.rooms[1];
    repo.passCard(roomKey, "Table", "Discard", cardId, function(card){
      var card = JSON.parse(card);
      repo.getUserKeys(roomKey, function(err, keys){
        keys.forEach(function(key){
          repo.getHand(roomKey, "Table", function(err, data){
            io.to(key).emit("removeCardFromTable", card);
          })
        })
      })
    });
  });

  socket.on("tableDeckDraw", function(){
    var roomKey = socket.rooms[1];
    var socketId = socket.id;
    repo.dealUserCard(roomKey, "Table", function(card) {
      var card = JSON.parse(card);
      socket.broadcast.to(roomKey).emit("cardDrawMessage", socket.username);
      repo.getUserKeys(roomKey, function(err, keys){
        keys.forEach(function(key){
          repo.getHand(roomKey, "Table", function(err, data){
            io.to(key).emit("addCardToTable", card);
          })
        })
      })
    });
  });

});

// Refactored Functions

// need to use inside every getHand callback
function jsonParser(data) {
  var jsonCards = [];
  for ( i=0; i < data.length; i++) {
    jsonCards.push(JSON.parse(data[i]))
  }
  return jsonCards;
}

// Update Hands for all users
function updateAllUserHands(roomKey){
  repo.getUserKeys(roomKey, function(err, keys){
    keys.forEach(function(key){
      repo.getUser(roomKey, key, function(err, username){
        repo.getHand(roomKey, username, function(err, data){
          io.to(key).emit("updateHand", jsonParser(data.sort()));
        })
      })
    })
  })
}
