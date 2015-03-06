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
  // passCard("Aaron", "Brian", "hearts8", gameId)
  // passCard(user:1234, )
  // waterfall(gameId)
  dealCards(gameId);
});


var gameId = "1234"
var gameId2 = 5

function createDeck(gameId) {
  var suite = ["hearts", "clubs", "spades", "diamonds"];
  var value = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];


  for (i = 0; i < suite.length; i++) {
    for (x = 0; x < value.length; x++) {
      client.hset(suite[i] + value[x], suite[i], value[x], redis.print)
      client.sadd(gameId+":deck", (suite[i] + value[x]))
    };
  };
};

function createUser(username, gameId) {
  client.hset(gameId+":users", gameId+":"+username, username)
}


  function randCard(gameId){
    client.srandmember(gameId+":deck", function(err, reply) {
      reply
    })
  }

  function dealCards(gameId) {
    var playerCount;
    client.hvals(gameId+":users", setImmediate(function(err, object){
      playerCount = object.length
      console.log("object", playerCount)
    }))
    console.log(playerCount)

    client.hvals(gameId+":users", function(err, object){
      for(i=0; i < object.length; i++){
        client.smove(gameId+":deck", gameId+":"+object[i]+":hand", setImmediate(randCard(gameId)))
       }
    })
  }

  // function dealCards(gameId) {
  //   client.hvals(gameId+":users", function(err, object){
  //     for(i=0; i < object.length; i++){
  //       client.smove(gameId+":deck", gameId+":"+object[i]+":hand", client.srandmember(gameId+":deck", function(err, reply) {
  //         console.log(reply)
  //         return String(reply)
  //       }));
  //      }
  //   })
  // }


// deck:GAME_ID = Set of cards
// game:GAME_ID_players = [player1_id, player2_id, player3_id]

// game:GAME_ID:hand:PLAYER_ID = Set of cards for the player
