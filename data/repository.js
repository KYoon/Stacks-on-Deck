if(process.env.REDISTOGO_URL) {
  rtg   = require("url").parse(process.env.REDISTOGO_URL);
  redis = require("redis")
  client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
  //then we're running locally
  redis = require("redis")
  client = redis.createClient();
}

// modules in order to get functions/methods in other files
module.exports.createUser = createUser;
module.exports.getUsers = getUsers;
module.exports.deckName = deckName;
module.exports.userHand = userHand;
module.exports.destroyUser = destroyUser;
module.exports.oneRandCard = oneRandCard;
module.exports.getUserKeys = getUserKeys;
module.exports.dealUserCard = dealUserCard;
module.exports.dealUsersCards = dealUsersCards;
module.exports.getHand = getHand;
module.exports.passCard = passCard;
module.exports.getTable = getTable;
module.exports.createDeck = createDeck;
module.exports.getUser = getUser;
module.exports.checkDeckCount = checkDeckCount;
module.exports.getKey = getKey;
module.exports.discardAllCards = discardAllCards;


client.on("error", function (err) {
  console.log("REDIS Error " + err);
});

client.on("connect", function(){
  console.log("REDIS connecting: ", arguments);
});

client.on("ready", function(){
  roomId = 1234
  createDeck(roomId);
});



function createDeck(roomId) {
  var suit = ["hearts", "clubs", "spades", "diams"];
  var value = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

var count = 1
  for (i = 0; i < suit.length; i++) {
    for (x = 0; x < value.length; x++) {
      client.hmset(roomId+"deck", count, '{"suit":"'+ suit[i]+'", "value":"'+ value[x]+'", "id":"' + count + '"}')
      client.sadd(roomId + ":deck", count)
      count++
    };
  };
};

function deckName(roomId) {
  return roomId+":deck"
}


function userHand(roomId, user) {
  return roomId+":"+user+":hand";
}

function createUser(roomId, username, userKey) {
  client.hset(roomId+":users", roomId+":"+username, username)
  client.hset(roomId+":users:keys", userKey, username)
  client.hset(roomId+":users:values", username, userKey)
}

function getUser(roomId, userKey, callback) {
  client.hget(roomId+":users:keys", userKey, callback)
}

function getKey(roomId, username, callback) {
  client.hget(roomId+":users:values", username, callback)
}

function dealUserCard(roomId, user, callback) {
  oneRandCard(roomId, function(err, id) {
      client.hget(roomId+"deck", id, function(err, card){
        client.sadd(userHand(roomId, user), card, function(err) {
          if(callback) {
            callback(card);
          }
      })
    });
  });
}

function dealUsersCards(roomId, handSize, callback) {
  getUsers(roomId, function(err, users){
    var count = 0;
    while( count < handSize ) {
      users.forEach(function(user) {
        dealUserCard(roomId, user);
      });
      count++;
    }
    callback.call(this);
  })
}

function destroyUser(roomId, username, callback) {
  client.hdel(roomId+":users", roomId+":"+username)
  client.hdel(roomId+":users:keys", roomId+":"+username+":key" )
}

function oneRandCard(roomId, callback){
  client.spop(deckName(roomId), callback);
}

function getUsers(roomId, callback) {
  client.hvals(roomId+":users", callback);
}


function getUserKeys(roomId, callback) {
  client.hkeys(roomId+":users:keys", callback)
}

function getHand(roomId, user, callback) {
  setTimeout(function() {
    client.smembers(userHand(roomId, user), callback);
  }, 200)
}

function passCard(roomId, from, to, cardId, callback) {
  client.hget(roomId+"deck", cardId, function(err, card) {
    client.smove(userHand(roomId, from), userHand(roomId, to), card, function(err) {
      if(callback) {
        callback(card);
      }
    })
  })
}

function getTable(roomId, to, callback) {
  getHand(roomId, "Table", function(err, cards){
    cards.forEach(function(card){
      client.smove(userHand(roomId, "Table"), userHand(roomId, to), card, function(err) {
        if(callback) {
          callback(card);
        }
      })
    });
  });
}

function checkDeckCount(roomId, callback) {
  client.scard(deckName(roomId),callback)
}

function discardAllCards(roomId, from, callback) {
  getHand(roomId, from, function(err, cards){
    cards.forEach(function(card){
      client.smove(userHand(roomId, from), userHand(roomId, "Discard"), card, function(err) {
        if(callback) {
          callback(card);
        }
      })
    });
  });
}
