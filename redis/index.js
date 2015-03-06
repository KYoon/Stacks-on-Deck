var redis = require("redis");
var waterfall = require('async-waterfall');
client = redis.createClient();
multi = client.multi();

client.on("error", function (err) {
  console.log("REDIS Error " + err);
});

client.on("connect", function(){
  console.log("REDIS connecting: ", arguments);
});

client.on("ready", function(){
  client.flushdb(function() {
    createDeck(gameId);

    createUser(gameId, "Aaron", 111);
    createUser(gameId, "Brian", 222);
    createUser(gameId, "BobLobLaw", 333);
    createUser(gameId, "John", 444);


    dealUsersCard(gameId, 6)


    setTimeout(function() {
      getUsers(gameId, function(err, reply){
        reply.forEach(function(userKey) {
          getHand(gameId, userKey, function(err, hand) {
            console.log(userKey);
            console.log(hand);
            console.log("\n\n\n")
          });
        });
      })
    }, 200);
  })
});


var gameId = "1234"

function createDeck(gameId) {
  var suit = ["hearts", "clubs", "spades", "diamonds"];
  var value = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];


  for (i = 0; i < suit.length; i++) {
    for (x = 0; x < value.length; x++) {
      client.hset(suit[i] + value[x], suit[i], value[x], redis.print)
      client.sadd(gameId+":deck", (suit[i] + value[x]))
    };
  };
};

  var deckName = function(gameId) {
    return gameId+":deck"
  }

  var userHand = function(gameId, user) {
    return gameId+":"+user+":hand";
  }

  function createUser(gameId, username, userKey) {
    client.hset(gameId+":users", gameId+":"+username, username)
    client.hset(gameId+":users:keys", gameId+":"+username+":key", userKey)
  }

  var destroyUser = function(gameId, username, callback) {
    client.hdel(gameId+":users", gameId+":"username)
    client.hdel(gameId+":users:keys", gameId+":"+username+":key" )
  }

  function oneRandCard(gameId, callback){
    client.spop(deckName(gameId), callback);
  }

  var getUsers = function(gameId, callback) {
    client.hvals(gameId+":users", callback);
  }


  var getUserKeys = function(gameId, username, callback) {
    client.hvals(gameId+":users:keys", gameId+":"+username+"key")
  }

  var dealUserCard = function(gameId, user) {
    oneRandCard(gameId, function(err, card) {
      console.log("user: " + user + " card: " + card);
      client.sadd(userHand(gameId, user), card, function(err) {
        console.log(err)
      });
    });
  }

  var dealUsersCard = function(gameId, handSize, callback) {
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

  var getHand = function(gameId, user, callback) {
    client.smembers(userHand(gameId, user), callback);
  }

  var passCard = function(gameId, from, to, card) {
    client.smove(userHand(gameId, from), userHand(gameId, to), card)
  }

  var getTable = function(gameId, to) {
    getHand(gameId, userHand(gameId, "Table"), to), function(cards){
      cards.forEach(function(card){
        passCard(gameId, "Table", userHand(gameId, to), card);
      });
    };
  }


