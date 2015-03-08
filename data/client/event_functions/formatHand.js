function formatHand(hand) {
  formattedHand = []
  for(var i=0; i<hand.length; i++) {
    formattedHand.push(formatCard(hand[i]));
  }
  return formattedHand;
};
