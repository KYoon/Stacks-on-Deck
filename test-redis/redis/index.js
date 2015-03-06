var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

var gameId = 1234
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
  client.sadd(gameId+":users", gameId+":"+username)
}

function dealCards() {
  // numUsers = scard gameId+":users"
  // for (i = 0; i < numUsers; i++)
  //   client.smove(gameId+":deck")
  a = client.smembers("1234:users")
  console.log(a)
}

// function passCard(user1, user2, card, gameId) {
//   client.smove(gameId+":"+user1, gameId+":"+user2, card)
// }

createDeck(gameId);
createDeck(gameId2);

createUser("Aaron", gameId);
createUser("Brian", gameId);
// passCard("Aaron", "Brian", "hearts8", gameId)
// passCard(user:1234, )
dealCards();
client.quit();


// deck:GAME_ID = Set of cards
// game:GAME_ID_players = [player1_id, player2_id, player3_id]

// game:GAME_ID:hand:PLAYER_ID = Set of cards for the player
