// Core frameworks
var io = require('socket.io')(server);
var _ = require('underscore');
var repo = require('./repository');

// Sockets!
io.on('connection', function(socket){
  var userjoined;
  var roomId;

  // User enters room
  socket.on("joinRoom", function(data){
    repo.checkDeckCount(data.roomId, function(err, count) {
      if (count === 0) {
        socket.join(data.roomId, function(error){
          socket.username = data.username;
          userjoined = data.username;
          roomId = data.roomId
          repo.createUser(data.roomId, data.username, socket.id);
          repo.getUsers(data.roomId, function(err, users){
            socket.emit("joinedGame", users);
          });
          socket.broadcast.to(data.roomId).emit('newPlayer', data.username);
        });
      } else {
        // socket.emit("gameInProgress");
        repo.getUser(roomId, socket.id, function(err, username){
          repo.getHand(roomId, username, function(err, data){
            io.to(socket.id).emit("updateHand", jsonParser(data.sort()));
          })
        })
      }
    });
  });

  // Deal cards to all users in a room
  socket.on("dealCards", function(data){
    var roomId = socket.rooms[1];
    io.to(roomId).emit("gameStartMessage");
    setTimeout(function(){
      repo.createDeck(roomId);
      repo.dealUsersCards(roomId, parseInt(data.dealingCount), function(){
        repo.checkDeckCount(roomId, function(err, count) {
          if (count === 0) {
            io.to(roomId).emit("deckEmptyMessage");
          }
        })
      });
      socket.broadcast.to(roomId).emit("cardsDealMessage", socket.username, data.dealingCount)
      updateAllUserHands(roomId);
    },1000);
  });

  // Pass a card from one user to another
  socket.on("passCard", function(data){
    var roomId = socket.rooms[1];
    var username = socket.username
    repo.passCard(roomId, username, data.toUser, data.cardId, function(card){
      var card = JSON.parse(card);
      socket.emit("removeCardFromHand", card);
      repo.getKey(roomId, data.toUser, function(err, key){
        io.to(key).emit("addCardToHand", card);
      });
      socket.broadcast.to(roomId).emit("cardPassMessage", username, data.toUser);
    });
  });

  // Draw a card from the deck
  socket.on("drawCard", function(){
    var roomId = socket.rooms[1];
    var username = socket.username;
    repo.dealUserCard(roomId, username, function(card) {
      var card = JSON.parse(card);
      repo.checkDeckCount(roomId, function(err, count) {
        if (count === 0) {
          io.to(roomId).emit("deckEmptyMessage");
        } else {
          socket.broadcast.to(roomId).emit("cardDrawMessage", socket.username);
          socket.emit("addCardToHand", card);
        }
      })
    });
  });

  // Pass a card to the table from the user's hand
  socket.on("passTable", function(cardId){
    var roomId = socket.rooms[1];
    var username = socket.username;
    repo.passCard(roomId, username, "Table", cardId, function(card){
      var card = JSON.parse(card);
      socket.emit("removeCardFromHand", card);
      io.to(roomId).emit("addCardToTable", card);
      socket.broadcast.to(roomId).emit("cardPlayToTableMessage", username
        )
    });
  });

  // User collects all the cards on the table
  socket.on("userCollectsTable", function(){
    var roomId = socket.rooms[1];
    var username = socket.username;
    var socketId = socket.id;
    repo.getTable(roomId, username, function(card){
      var card = JSON.parse(card);
      socket.emit("addCardToHand", card);
      io.to(roomId).emit("removeCardFromTable", card);
    });
    socket.broadcast.to(roomId).emit("userTakeAllMessage", username);
  });

  // User discards a card from his/her hand
  socket.on("userDiscardsCard", function(cardId){
    var roomId = socket.rooms[1];
    var username = socket.username;
    var socketId = socket.id;
    repo.passCard(roomId, username, "Discard", cardId, function(card){
      var card = JSON.parse(card);
      socket.emit("removeCardFromHand", card);
      socket.broadcast.to(roomId).emit("cardDiscardMessage", username)
    });
  });

  // User obtains a card from a table
  socket.on("getTableCard", function(cardId){
    var roomId = socket.rooms[1];
    var username = socket.username;
    var socketId = socket.id;
    repo.passCard(roomId, "Table", username, cardId, function(card){
      var card = JSON.parse(card);
      socket.emit("addCardToHand", card);
      socket.broadcast.to(roomId).emit("userTakeOneMessage", username);
      io.to(roomId).emit("removeCardFromTable", card);
      io.to(roomId).emit("removeCardFromTable", card);
    });
  });

  // Discard a card from the table
  socket.on("discardTableCard", function(cardId){
    var roomId = socket.rooms[1];
    var username = socket.username;
    repo.passCard(roomId, "Table", "Discard", cardId, function(card){
      var card = JSON.parse(card);
      repo.getUserKeys(roomId, function(err, keys){
        socket.broadcast.to(roomId).emit("tableCardDiscardMessage", username)
        keys.forEach(function(key){
          repo.getHand(roomId, "Table", function(err, data){
            io.to(key).emit("removeCardFromTable", card);
          });
        });
      });
    });
  });

  // Draw a card from the deck directly to the table
  socket.on("tableDeckDraw", function(){
    var roomId = socket.rooms[1];
    var socketId = socket.id;
    repo.dealUserCard(roomId, "Table", function(card) {
      var card = JSON.parse(card);
      repo.checkDeckCount(roomId, function(err, count) {
        if (count === 0) {
          io.to(roomId).emit("deckEmptyMessage");
        } else {
          socket.broadcast.to(roomId).emit("cardDrawToTableMessage", socket.username);
          repo.getUserKeys(roomId, function(err, keys){
            keys.forEach(function(key){
              repo.getHand(roomId, "Table", function(err, data){
                io.to(key).emit("addCardToTable", card);
              });
            });
          });
        }
      })

    });
  });

  // Flipping a card on the table flips that card for each person
  socket.on("cardFlip", function(cardId){
    var roomId = socket.rooms[1];
    socket.broadcast.to(roomId).emit("peerCardFlip", cardId);
  });

  // When a user disconnects, all of their cards are discarded
  socket.on("disconnect", function(socket){
    repo.discardAllCards(roomId, userjoined);
    repo.destroyUser(roomId, userjoined);
    io.to(roomId).emit("playerLeaveMessage", userjoined);
    io.to(roomId).emit("userLeft", userjoined);
    repo.discardAllCards(roomId, userjoined);
    io.to(roomId).emit("playerLeaveMessage", userjoined);
    io.to(roomId).emit("userLeft", userjoined)
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
function updateAllUserHands(roomId){
  repo.getUserKeys(roomId, function(err, keys){
    keys.forEach(function(key){
      repo.getUser(roomId, key, function(err, username){
        repo.getHand(roomId, username, function(err, data){
          io.to(key).emit("updateHand", jsonParser(data.sort()));
        })
      })
    })
  })
}
