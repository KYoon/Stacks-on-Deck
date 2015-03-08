function formatCard(cardname) {
  card = {};
  if(/diamonds/.test(cardname)) {
    card.suit = "diams";
    card.value = cardname.slice(8);
  } else if (/hearts/.test(cardname)) {
    card.suit = cardname.slice(0,6);
    card.value = cardname.slice(6);
  } else if (/clubs/.test(cardname)) {
    card.suit = cardname.slice(0,5);
    card.value = cardname.slice(5);
  } else if(/spades/.test(cardname)) {
    card.suit = cardname.slice(0,6);
    card.value = cardname.slice(6);
  }
  return card;
}
