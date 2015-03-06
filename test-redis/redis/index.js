var redis = require("redis");
var waterfall = require('async-waterfall');
client = redis.createClient();

client.on("error", function (err) {
  console.log("REDIS Error " + err);
});

client.on("connect", function(){
  console.log("REDIS connecting: ", arguments);
});

client.on("ready", function(){
  createDeck(gameId);

  createUser("Aaron", gameId);
  createUser("Brian", gameId);
  createUser("BobLobLaw", gameId)
  createUser("John", gameId)

  getHand(gameId, "Brian")
  // randCard(gameId, function(err, card){console.log(card)})

  dealUsersCard(gameId, 5)
  // dealUsersHands(gameId, 5);
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

function createUser(username, gameId) {
  client.hset(gameId+":users", gameId+":"+username, username)
}

  function oneRandCard(gameId, callback){
    client.srandmember(deckName(gameId), callback);
  }

  var getUsers = function(gameId, callback) {
    client.hvals(gameId+":users", callback);
  }

  var dealUserCard = function(gameId, user) {
    randCard(gameId, function(err, card) {
      console.log("dealing "+card+" for "+user)
      client.smove(deckName(gameId), userHand(gameId, user), card);
    });
  }

  var dealUsersCard = function(gameId, handSize) {
    getUsers(gameId, function(err, users){
      var count = 0;
      while( count <= handSize ) {
        console.log(count + " up to " + handSize);
        users.forEach(function(user) {
          dealUserCard(gameId, user);
        });
        count++;
      }
    console.log("first")
    })
  }

  var getHand = function(gameId, user) {
    client.smembers(userHand(gameId, user))
  }

  var passCard = function(gameId, from, to, card) {
    client.smove(userHand(gameId, from), userHand(gameId, to), card)
  }

  var getTable = function() {

  }


  // var dealUsersCard = function(gameId) {

  //   getUsers(gameId, function(err, users){
  //   console.log(users)
  //     for (i=0; i < users.length; i++) {
  //       console.log(i)
  //       console.log(users[i])
  //       dealUserCard(gameId, users[i])
  //     };
  //       // users.forEach(function(user) {
  //       //   dealUserCard(gameId, user);
  //       // });
  //   });
  //   // })
  //   console.log("first")
  // }

  // var dealUsersHands = function(gameId, handSize) {
  //   var count = 0;
  //   do {
  //     dealUsersCard(gameId);
  //     count++;
  //   } while (count <= handSize);
  // }






// deck:GAME_ID = Set of cards
// game:GAME_ID_players = [player1_id, player2_id, player3_id]

// game:GAME_ID:hand:PLAYER_ID = Set of cards for the player
