# card events / functions
## c = client is emitting event
## s = server is emitting/brodcasting event

 * c: connection
 * c: disconnect -- research how to manually disconnect
 * c: joinRoom

 * s: updateClients -- getUsers array of users

 * fn: passCard
 * fn: discardCard
  -> * c: sendCard
 * c: drawCard

 * s: updateHand
 * c: dealCards -- dealHand (game id, card_quantity)
