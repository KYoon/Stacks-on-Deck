var repo = require("../data/repository");



describe("Redis Database", function(){
  var gameId = 123
  var username = "Kevin"
  var userKey = 000

  describe("deckName", function(){
    it("concates :deck to the gameId", function(){
      expect(repo.deckName(gameId)).toEqual("123:deck");
    });
  });

  describe("userHand", function(){
    it("string interpolation properly", function(){
      expect(repo.userHand(gameId, username)).toEqual("123:Kevin:hand")
    });
  });

  describe("createUser", function(){
    repo.createUser(gameId, username, userKey)

    it("creates a key in the users hash", function(){
      expect(client.hget("123:users", "123:Kevin")).toEqual("Kevin")
    })
  })
});
