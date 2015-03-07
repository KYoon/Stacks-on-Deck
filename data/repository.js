var redis = require("redis");
client = redis.createClient();
multi = client.multi();

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

client.on("error", function (err) {
  console.log("REDIS Error " + err);
});

client.on("connect", function(){
  console.log("REDIS connecting: ", arguments);
});

client.on("ready", function(){
  // setTimeout(function(){
  //   client.quit();
  // }, 200);
  // client.flushdb(function() {
  //   createDeck(gameId);

  //   createUser(gameId, "Aaron", 111);
  //   createUser(gameId, "Brian", 222);
  //   createUser(gameId, "BobLobLaw", 333);
  //   createUser(gameId, "John", 444);

  //   dealUsersCards(gameId, 6)


  //   setTimeout(function() {
  //     getUsers(gameId, function(err, reply){
  //       reply.forEach(function(userKey) {
  //         getHand(gameId, userKey, function(err, hand) {
  //           console.log(userKey);
  //           console.log(hand);
  //           console.log("\n\n\n")
  //         });
  //       });
  //     })
  //   }, 200);
  // })
});


// var gameId = "1234"

function createDeck(gameId) {
  var suit = ["hearts", "clubs", "spades", "diamonds"];
  var value = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];


  for (i = 0; i < suit.length; i++) {
    for (x = 0; x < value.length; x++) {
      client.hset(suit[i] + value[x], suit[i], value[x])
      client.sadd(gameId+":deck", (suit[i] + value[x]))
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
  // client.hset(gameId+":users:keys", gameId+":"+username, userKey)
  client.hset(gameId+":users:keys", userKey, username)
}

function getUser(gameId, userKey, callback) {
  client.hget(gameId+":users:keys", userKey, callback)
}

function dealUserCard(gameId, user) {
  oneRandCard(gameId, function(err, card) {
    console.log("user: " + user + " card: " + card);
    client.sadd(userHand(gameId, user), card, function(err) {
      // console.log(err)
    });
  });
}

function dealUsersCards(gameId, handSize, callback) {
  getUsers(gameId, function(err, users){
    var count = 0;
    while( count < handSize ) {
      users.forEach(function(user) {
        // console.log("user: " + user + " count: " + count)
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

function passCard(gameId, from, to, card) {
  client.smove(userHand(gameId, from), userHand(gameId, to), card)
}

function getTable(gameId, to) {
  getHand(gameId, userHand(gameId, "Table"), to), function(cards){
    cards.forEach(function(card){
      passCard(gameId, "Table", userHand(gameId, to), card);
    });
  };
}


