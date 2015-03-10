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
module.exports.dealUsersCards = dealUsersCards;
module.exports.getUser = getUser;
module.exports.checkDeckCount = checkDeckCount;

client.on("error", function (err) {
  console.log("REDIS Error " + err);
});

client.on("connect", function(){
  console.log("REDIS connecting: ", arguments);
});

client.on("ready", function(){
  gameId = 1234
  createDeck(gameId);
});



function createDeck(gameId) {
  var suit = ["hearts", "clubs", "spades", "diams"];
  var value = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

var count = 1
  for (i = 0; i < suit.length; i++) {
    for (x = 0; x < value.length; x++) {
      client.hmset(gameId+"deck", count, '{"suit":"'+ suit[i]+'", "value":"'+ value[x]+'", "id":"' + count + '"}')
      client.sadd(gameId + ":deck", count)
      count++
    };
  };
};

function deckName(gameId) {
  return gameId+":deck"
}


function userHand(gameId, user) {
  return gameId+":"+user+":hand";
}

function createUser(gameId, username, userKey) {
  client.hset(gameId+":users", gameId+":"+username, username)
  client.hset(gameId+":users:keys", userKey, username)
}

function getUser(gameId, userKey, callback) {
  client.hget(gameId+":users:keys", userKey, callback)
}

function dealUserCard(gameId, user, callback) {
  oneRandCard(gameId, function(err, id) {
      client.hget(gameId+"deck", id, function(err, card){
        client.sadd(userHand(gameId, user), card, function(err) {
          if(callback) {
            callback(card);
          }
      })
    });
  });
}

function dealUsersCards(gameId, handSize, callback) {
  getUsers(gameId, function(err, users){
    var count = 0;
    while( count < handSize ) {
      users.forEach(function(user) {
        dealUserCard(gameId, user);
      });
      count++;
    }
  })
}

var destroyUser = function(gameId, username, callback) {
  client.hdel(gameId+":users", gameId+":"+username)
  client.hdel(gameId+":users:keys", gameId+":"+username+":key" )
}

function oneRandCard(gameId, callback){
  client.spop(deckName(gameId), callback);
}

function getUsers(gameId, callback) {
  client.hvals(gameId+":users", callback);
}


function getUserKeys(gameId, callback) {
  client.hkeys(gameId+":users:keys", callback)
}

function getHand(gameId, user, callback) {
  setTimeout(function() {
    client.smembers(userHand(gameId, user), callback);
  }, 200)
}

function passCard(gameId, from, to, id) {
  client.hget(gameId+"deck", id, function(err, card) {
    client.smove(userHand(gameId, from), userHand(gameId, to), card)
  })
}

function getTable(gameId, to) {
  getHand(gameId, "Table", function(err, cards){
    cards.forEach(function(card){
      client.smove(userHand(gameId, "Table"), userHand(gameId, to), card)
    });
  });
}

function checkDeckCount(gameId, callback) {
  client.scard(deckName(gameId), callback)
}


