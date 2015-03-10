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
    console.log(data);
    // need to transfer the data of faceDown card attribute to cards
    var roomKey = socket.rooms[1];
    repo.createDeck(roomKey);
    repo.dealUsersCards(roomKey, parseInt(data.dealingCount));
    updateAllUserHands(roomKey);
  });

  // Pass a card from one user to another
  socket.on("passCard", function(data){
    var roomKey = socket.rooms[1];
    repo.passCard(roomKey, socket.username, data.toUser, data.cardId);
    updateAllUserHands(roomKey);
  });

  // Draw a card from the deck
  socket.on("drawCard", function(){
    var roomKey = socket.rooms[1];
    var username = socket.username;
    var socketId = socket.id;

    repo.dealUserCard(roomKey, username, function(card) {
      var card = JSON.parse(card);
      io.to(socketId).emit("addCardToHand", card);
    });
  });

    // sendUserHand(roomKey, username, socketId);
  // });

  // Pass a card to the table from the user's hand
  socket.on("passTable", function(cardId){
    var roomKey = socket.rooms[1];
    var username = socket.username;
    var socketId = socket.id;
    repo.passCard(roomKey, username, "Table", cardId);
    updateUserHandAndTable(roomKey, username, socketId);
  });

  // User collects all the cards on the table
  socket.on("userCollectsTable", function(){
    var roomKey = socket.rooms[1];
    var username = socket.username;
    var socketId = socket.id;
    repo.getTable(roomKey, username);
    // Possible to get around setTimeout?
    setTimeout(function(){
      updateUserHandAndTable(roomKey, username, socketId);
    }, 105);
  });

  // User discards a card from his/her hand
  socket.on("userDiscardsCard", function(cardId){
    var roomKey = socket.rooms[1];
    var username = socket.username;
    var socketId = socket.id;
    repo.passCard(roomKey, username, "Discard", cardId);
    updateUserHand(roomKey, username, socketId);
  });

  // User obtains a card from a table
  socket.on("getTableCard", function(cardId){
    var roomKey = socket.rooms[1];
    var username = socket.username;
    var socketId = socket.id;
    repo.passCard(roomKey, "Table", username, cardId);
    // Possible to get around setTimeout?
    setTimeout(function(){
      updateUserHandAndTable(roomKey, username, socketId);
    }, 105);
  });

  // Discard a card from the table
  socket.on("discardTableCard", function(cardId){
    var roomKey = socket.rooms[1];
    repo.passCard(roomKey, "Table", "Discard", cardId);
    updateTableView(roomKey);
  });

  socket.on("tableDeckDraw", function(){
    var roomKey = socket.rooms[1];
    var socketId = socket.id;
    repo.dealUserCard(roomKey, "Table");
    updateTableView(roomKey);
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


function sendUserHand(roomKey, username, socketId){
  repo.getHand(roomKey, username, function(err, data){
    io.to(socketId).emit("addCardToHand", jsonParser(data.sort()));
  });
}

// Update Table for each client
function updateTableView(roomKey){
  repo.getUserKeys(roomKey, function(err, keys){
    keys.forEach(function(key){
      repo.getHand(roomKey, "Table", function(err, data){
        io.to(key).emit("updateTable",  jsonParser(data.sort()));
      })
    })
  })
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

// Update the user's hand that activated the event and update the table
function updateUserHandAndTable(roomKey, username, socketId){
  repo.getHand(roomKey, username, function(err, data){
    io.to(socketId).emit("updateHand", jsonParser(data.sort()));
    updateTableView(roomKey);
  });
}