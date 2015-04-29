Stacks on Deck
==============

## Description
Our vision for Stacks on Deck is that we wanted to not make just a card game, but for it to be emulated into all card games. When using this application, you have the basic functionalities of having a 52 card deck to be played with you and your friends over an internet connection in a dedicated room with a room key that created by you or randomly generated if left blank.

We also have the option to have a dedicated virtual table which allows users that have access to the table to move the cards around and flip them over. The app can be played on all personal machines, mobile devices, and browsers. The cards' look may vary.

## Website
https://stacksondeck.herokuapp.com

## Run locally
Install all the dependencies:

    npm install (may need to prefix with sudo if on Mac)

If grunt in not install on the local machine:

    npm install grunt-cli -g

Run the Redis server:

    redis-server
 
Open another tab within your command line.
Then to concat all clientside JS files into socket_magic.js, compile templates, and run the app:

    grunt && node app.js

Then navigate to 'http://localhost:3000'

### Extra commands to know about:

To access Redis command line interface

    redis-cli

To run JSHint across all JS files:

    grunt jshint

## Technology Stack
* Node.js
* Redis
* Express.js
* Socket.io
* Backbone.js
* Underscore.js
* Grunt 
* Capybara

## Where to get help
#### Docs
* http://socket.io/docs/
* http://redis.io/documentation
* http://backbonejs.org/
* http://underscorejs.org/

#### Email contact
stacks.cards@gmail.com

## Todo
* Testing
* Intuitiveness
* Reset deck option
* Move cards around in hand
* Move cards around on table (not on dedicated table)
* Implement customization of table and deck
* Make preset games
* Allow players to make rules
* Allow players to join game already in progress
    * Partially done. Player able to join game in progress. Able to see do regular hand functions, able to do table functions, able to get cards that are on the table already. HOWEVER, all cards are flipped over. Need to figure out which cards are all flipped over either through Redis or other means.
    * Branch - `player-join-game-in-progress`

## How to contribute
Make a pull request and then wait for a response! Please make commits often and be as descriptive as you can if you are to make a pull request. Also, to reference the original team, include @KYoon @aamharris @Bsheridan12 @fgv02009 @jnmandal within the pull request.

## Original Team
- [Kevin Yoon - `KYoon`](https://github.com/KYoon)
- [Aaron Harris - `aamharris`](https://github.com/aamharris)
- [Brian Sheridan - `Bsheridan12`](https://github.com/Bsheridan12)
- [Flori Garcia-Vicente - `fgv02009`](https://github.com/fgv02009)
- [John Mandalakas - `jnmandal`](https://github.com/jnmandal)

## Special Thanks
- [Nate Delage - `ndelage`](https://github.com/ndelage)
- [Lucas Willett - `ltw`](https://github.com/ltw)
- [Leon Gersing - `leongersing`](https://github.com/leongersing)

## Contributors
* This could be you!
