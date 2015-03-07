var repo = require("../data/repository");



describe("Redis Database", function(){
  var gameId = 123

  describe("deckName", function(){
    it("concacts :deck to the gameId", function(){
      expect(repo.deckName(gameId)).toEqual("123:deck");
    });
  });
});
