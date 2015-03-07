var redis = require("./index");

describe("Redis", function(){
  var gameId = 123

  describe("When creating a deck name", function(){
    it("should concact :deck on the end of the gameId", function(){
      expect(redis.deckName(gameId)).toEqual("123:deck")
    });
  });


});
