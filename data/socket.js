// Core frameworks
var io = require('socket.io')(server);
var _ = require('underscore');
var repo = require('./repository');

// Sockets!
io.on('connection', function(socket){
  var userJoined;
  var roomId;

  // User enters room
  socket.on("joinRoom", function(data){
    socket.username = data.username;
    userJoined = data.username;
    roomId = data.roomId;
    repo.checkDeckCount(roomId, function(err, count) {
      if (count === 0) {
        socket.join(roomId, function(error){
          repo.createUser(roomId, userJoined, socket.id);
          repo.getUsers(roomId, function(err, users){
            socket.emit("joinedGame", users);
          });
          socket.broadcast.to(roomId).emit('newPlayer', userJoined);
        });
      } else {
        // socket.emit("gameInProgress");
        socket.join(roomId, function(error){
          repo.createUser(roomId, userJoined, socket.id);
          playerJoiningLate(roomId, socket.id)
          repo.getUsers(roomId, function(err, users){
            socket.emit("joinedGame", users);
          });
          socket.broadcast.to(roomId).emit('newPlayer', userJoined);
        });
      }
    });
});

  // Deal cards to all users in a room
  socket.on("dealCards", function(data){
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
      socket.broadcast.to(roomId).emit("cardsDealMessage", userJoined, data.dealingCount)
      updateAllUserHands(roomId);
    },1000);
  });

  // Pass a card from one user to another
  socket.on("passCard", function(data){
    repo.passCard(roomId, userJoined, data.toUser, data.cardId, function(card){
      var card = JSON.parse(card);
      socket.emit("removeCardFromHand", card);
      repo.getKey(roomId, data.toUser, function(err, key){
        io.to(key).emit("addCardToHand", card);
      });
      socket.broadcast.to(roomId).emit("cardPassMessage", userJoined, data.toUser);
    });
  });

  // Draw a card from the deck
  socket.on("drawCard", function(){
    repo.dealUserCard(roomId, userJoined, function(card) {
      var card = JSON.parse(card);
      repo.checkDeckCount(roomId, function(err, count) {
        if (count === 0) {
          io.to(roomId).emit("deckEmptyMessage");
        } else {
          socket.broadcast.to(roomId).emit("cardDrawMessage", userJoined);
          socket.emit("addCardToHand", card);
        }
      })
    });
  });

  // Pass a card to the table from the user's hand
  socket.on("passTable", function(cardId){
    repo.passCard(roomId, userJoined, "Table", cardId, function(card){
      var card = JSON.parse(card);
      socket.emit("removeCardFromHand", card);
      io.to(roomId).emit("addCardToTable", card);
      socket.broadcast.to(roomId).emit("cardPlayToTableMessage", userJoined
        )
    });
  });

  // User collects all the cards on the table
  socket.on("userCollectsTable", function(){
    repo.getTable(roomId, userJoined, function(card){
      var card = JSON.parse(card);
      socket.emit("addCardToHand", card);
      io.to(roomId).emit("removeCardFromTable", card);
    });
    socket.broadcast.to(roomId).emit("userTakeAllMessage", userJoined);
  });

  // User discards a card from his/her hand
  socket.on("userDiscardsCard", function(cardId){
    repo.passCard(roomId, userJoined, "Discard", cardId, function(card){
      var card = JSON.parse(card);
      socket.emit("removeCardFromHand", card);
      socket.broadcast.to(roomId).emit("cardDiscardMessage", userJoined)
    });
  });

  // User obtains a card from a table
  socket.on("getTableCard", function(cardId){
    repo.passCard(roomId, "Table", userJoined, cardId, function(card){
      var card = JSON.parse(card);
      socket.emit("addCardToHand", card);
      socket.broadcast.to(roomId).emit("userTakeOneMessage", userJoined);
      io.to(roomId).emit("removeCardFromTable", card);
      io.to(roomId).emit("removeCardFromTable", card);
    });
  });

  // Discard a card from the table
  socket.on("discardTableCard", function(cardId){
    repo.passCard(roomId, "Table", "Discard", cardId, function(card){
      var card = JSON.parse(card);
      repo.getUserKeys(roomId, function(err, keys){
        socket.broadcast.to(roomId).emit("tableCardDiscardMessage", userJoined)
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
    repo.dealUserCard(roomId, "Table", function(card) {
      var card = JSON.parse(card);
      repo.checkDeckCount(roomId, function(err, count) {
        if (count === 0) {
          io.to(roomId).emit("deckEmptyMessage");
        } else {
          socket.broadcast.to(roomId).emit("cardDrawToTableMessage", userJoined);
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
  socket.on("peerCardFlip", function(cardAttributes){
    socket.broadcast.to(roomId).emit("peerCardFlip", cardAttributes.id);
    repo.setCardFlip(roomId, cardAttributes, "Table");
  });

  // Flipping a card in hand which updates it in Redis
  socket.on("selfCardFlip", function(cardAttributes){
    repo.setCardFlip(roomId, cardAttributes, userJoined);
  })

  // When a user disconnects, all of their cards are discarded
  socket.on("disconnect", function(socket){
    repo.discardAllCards(roomId, userJoined);
    repo.destroyUser(roomId, userJoined);
    io.to(roomId).emit("playerLeaveMessage", userJoined);
    io.to(roomId).emit("userLeft", userJoined);
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

// Render/Update table for the people who join in late
function playerJoiningLate(roomId, userId){
  repo.getHand(roomId, "Table", function(err, data){
    io.to(userId).emit("playerJoiningLate", jsonParser(data));
  })
}
