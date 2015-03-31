// Core frameworks
var io = require('socket.io')(server);
var _ = require('underscore');
var repo = require('./repository');

// Sockets!
io.on('connection', function(socket){
  var userjoined;
  var roomid;

  // User enters room
  socket.on("joinRoom", function(data){
    repo.checkDeckCount(data.roomkey, function(err, count) {
      if (count === 0) {
        socket.join(data.roomkey, function(error){
          socket.username = data.username;
          userjoined = data.username;
          roomid = data.roomkey
          repo.createUser(data.roomkey, data.username, socket.id);
          repo.getUsers(data.roomkey, function(err, users){
            socket.emit("joinedGame", users);
          });
          socket.broadcast.to(data.roomkey).emit('newPlayer', data.username);
        });
      } else {
        socket.emit("gameInProgress");
      }
    });
  });

  // Deal cards to all users in a room
  socket.on("dealCards", function(data){
    var roomKey = socket.rooms[1];
    io.to(roomKey).emit("gameStartMessage");
    setTimeout(function(){
      repo.createDeck(roomKey);
      repo.dealUsersCards(roomKey, parseInt(data.dealingCount), function(){
        repo.checkDeckCount(roomKey, function(err, count) {
          if (count === 0) {
            io.to(roomKey).emit("deckEmptyMessage");
          }
        })
      });
      socket.broadcast.to(roomKey).emit("cardsDealMessage", socket.username, data.dealingCount)
      updateAllUserHands(roomKey);
    },1000);
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
      socket.broadcast.to(roomKey).emit("cardPassMessage", username, data.toUser);
    });
  });

  // Draw a card from the deck
  socket.on("drawCard", function(){
    var roomKey = socket.rooms[1];
    var username = socket.username;
    repo.dealUserCard(roomKey, username, function(card) {
      var card = JSON.parse(card);
      repo.checkDeckCount(roomKey, function(err, count) {
        if (count === 0) {
          io.to(roomKey).emit("deckEmptyMessage");
        } else {
          socket.broadcast.to(roomKey).emit("cardDrawMessage", socket.username);
          socket.emit("addCardToHand", card);
        }
      })
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
      socket.broadcast.to(roomKey).emit("cardPlayToTableMessage", username
        )
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
      socket.broadcast.to(roomKey).emit("userTakeAllMessage", username);
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
      socket.broadcast.to(roomKey).emit("cardDiscardMessage", username)
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
      socket.broadcast.to(roomKey).emit("userTakeOneMessage", username);
      io.to(roomKey).emit("removeCardFromTable", card);
    });
  });

  // Discard a card from the table
  socket.on("discardTableCard", function(cardId){
    var roomKey = socket.rooms[1];
    var username = socket.username;
    repo.passCard(roomKey, "Table", "Discard", cardId, function(card){
      var card = JSON.parse(card);
      repo.getUserKeys(roomKey, function(err, keys){
        socket.broadcast.to(roomKey).emit("tableCardDiscardMessage", username)
        keys.forEach(function(key){
          repo.getHand(roomKey, "Table", function(err, data){
            io.to(key).emit("removeCardFromTable", card);
          });
        });
      });
    });
  });

  // Draw a card from the deck directly to the table
  socket.on("tableDeckDraw", function(){
    var roomKey = socket.rooms[1];
    var socketId = socket.id;
    repo.dealUserCard(roomKey, "Table", function(card) {
      var card = JSON.parse(card);
      repo.checkDeckCount(roomKey, function(err, count) {
        if (count === 0) {
          io.to(roomKey).emit("deckEmptyMessage");
        } else {
          socket.broadcast.to(roomKey).emit("cardDrawToTableMessage", socket.username);
          repo.getUserKeys(roomKey, function(err, keys){
            keys.forEach(function(key){
              repo.getHand(roomKey, "Table", function(err, data){
                io.to(key).emit("addCardToTable", card);
              });
            });
          });
        }
      })

    });
  });

  socket.on("cardFlip", function(cardId){
    var roomKey = socket.rooms[1];
    socket.broadcast.to(roomKey).emit("peerCardFlip", cardId);
  });

  socket.on("disconnect", function(socket){
    repo.discardAllCards(roomid, userjoined);
    repo.destroyUser(roomid, userjoined);
    io.to(roomid).emit("playerLeaveMessage", userjoined);
    io.to(roomid).emit("userLeft", userjoined);
  })

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
