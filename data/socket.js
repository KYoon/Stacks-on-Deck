// core frameworks
var io = require('socket.io')(server);
var _ = require('underscore');
var repo = require('./repository');

// sockets!
io.on('connection', function(socket){
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

  // need to use inside every getHand callback
  function jsonParser(data) {
    var jsonCards = [];
    for ( i=0; i < data.length; i++) {
      jsonCards.push(JSON.parse(data[i]))
    }
    return jsonCards;
  }

  socket.on("dealCards", function(data){
    var roomKey = socket.rooms[1];
    repo.createDeck(roomKey);
    repo.dealUsersCards(roomKey, parseInt(data.dealingCount));

    repo.getUserKeys(roomKey, function(err, keys){
      var socketKeys = keys
      socketKeys.forEach(function(key){
        repo.getUser(roomKey, key, function(err, username){
          repo.getHand(roomKey, username, function(err, data){
            io.to(key).emit("updateHand", jsonParser(data));
          })
        })
      })
    })
  });

  socket.on("passCard", function(data){
    var roomKey = socket.rooms[1];
    repo.passCard(roomKey, socket.username, data.toUser, data.cardId)
    repo.getUserKeys(roomKey, function(err, keys){
      var socketKeys = keys
      socketKeys.forEach(function(key){
        repo.getUser(roomKey, key, function(err, username){
          repo.getHand(roomKey, username, function(err, data){
            io.to(key).emit("updateHand",  jsonParser(data));
          })
        })
      })
    })
  })

  socket.on("drawCard", function(){
    var roomKey = socket.rooms[1];
    repo.dealUserCard(roomKey, socket.username);
    repo.getHand(roomKey, socket.username, function(err, data){
      io.to(socket.id).emit("updateHand",  jsonParser(data));
    })
  })

  socket.on("passTable", function(cardId){
    var roomKey = socket.rooms[1];
    repo.passCard(roomKey, socket.username, "Table", cardId);
    repo.getHand(roomKey, socket.username, function(err, data){
      io.to(socket.id).emit("updateHand", jsonParser(data));

      repo.getUserKeys(roomKey, function(err, keys){
        var socketKeys = keys
        socketKeys.forEach(function(key){
          repo.getHand(roomKey, "Table", function(err, data){
            console.log("table" + data)
            io.to(key).emit("updateTable",  jsonParser(data));
          })
        })
      })
    })
  })

  socket.on("userCollectsTable", function(){
    var roomKey = socket.rooms[1];
    repo.getTable(roomKey, socket.username);
    setTimeout(function(){
      repo.getHand(roomKey, socket.username, function(err, data){
        io.to(socket.id).emit("updateHand", jsonParser(data));
        repo.getUserKeys(roomKey, function(err, keys){
          var socketKeys = keys
          socketKeys.forEach(function(key){
            repo.getHand(roomKey, "Table", function(err, data){
              io.to(key).emit("updateTable",  jsonParser(data));
            })
          })
        })
      })
    }, 105)
  })

  socket.on("userDiscardsCard", function(cardId){
    var roomKey = socket.rooms[1];
    repo.passCard(roomKey, socket.username, "Discard", cardId);
    repo.getHand(roomKey, socket.username, function(err, data){
      io.to(socket.id).emit("updateHand",  jsonParser(data));
    })
  })

  socket.on("getTableCard", function(cardId){
    var roomKey = socket.rooms[1];
    repo.passCard(roomKey, "Table", socket.username, cardId);
    setTimeout(function(){
      repo.getHand(roomKey, socket.username, function(err, data){
        io.to(socket.id).emit("updateHand", jsonParser(data));
        repo.getUserKeys(roomKey, function(err, keys){
          var socketKeys = keys
          socketKeys.forEach(function(key){
            repo.getHand(roomKey, "Table", function(err, data){
              io.to(key).emit("updateTable",  jsonParser(data));
            })
          })
        })
      })
    }, 105)
  })

  socket.on("discardTableCard", function(cardId){
    var roomKey = socket.rooms[1];
    repo.passCard(roomKey, "Table", "Discard", cardId);
    repo.getUserKeys(roomKey, function(err, keys){
      var socketKeys = keys
      socketKeys.forEach(function(key){
        repo.getHand(roomKey, "Table", function(err, data){
          io.to(key).emit("updateTable",  jsonParser(data));
        })
      })
    })
  })

});
