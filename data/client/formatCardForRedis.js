function formatCardForRedis(cardObj) {
  var cardString;
  cardString = cardObj.suit + cardObj.value.toUpperCase();
  return cardSting;
}

socket.emit("cardPlace", formatCardForRedis(activeCard))
