// core frameworks
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('underscore');

// templates
app.set('views', './views')
app.set('view engine', 'ejs')

// middleware
var bodyParser = require('body-parser');
var session = require('express-session');

// sessions
app.use(session({secret: 'so_secret'}));

// params
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// static files
app.use("/public", express.static(__dirname + '/public'));
app.use("/socket.io", express.static(__dirname + '/node_modules/socket.io'));

// server
server.listen(3000);

// routes
app.get('/', function(req, res){
  res.render('index.ejs')
  return;
});

app.post('/games', function(req, res) {
  var roomkey = keyGenerator();
  var username = req.body.username;
  req.session["username"] = username;
  req.session["roomkey"] = roomkey;
  // check if gameKey currently exists in redis
  // create new game
  res.redirect('/games/' + roomkey);
  return;
});

app.post('/join', function(req, res) {
  var roomkey = req.body.roomkey;
  var username = req.body.username;
  req.session["username"] = username;
  req.session["roomkey"] = roomkey;
  res.redirect('/games/'+ roomkey);
  return;
})


app.get('/games/:key', function(req, res) {
  // validate key is legit
  res.render('game.ejs', {username: req.session["username"], roomkey: req.session["roomkey"]})
  return;
})

function keyGenerator(){
  var key = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (i=0; i<4; i++) {
    key += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return key;
}

function getAllUsers(roomkey){
  // console.log("printing people in da room")
  // console.log(io.sockets.adapter.rooms[roomkey])
  // var clients = io.clients(roomkey);
  // return clients;
  // THIS WILL BE CALLED FROM THE METHODS FROM REDIS
}

// sockets!
io.on('connection', function(socket){
  socket.on("joinRoom", function(data){
    socket.emit('message', "joined room " + data.roomkey);
    socket.join(data.roomkey, function(error){
      console.log("User joined a room");
      io.to(data.roomkey).emit("message", data.username + " joined the room!");
      io.to(data.roomkey).emit("peerUpdate", getAllUsers(data.roomkey));
      if(error){console.log("error:" + error);}
    });
  });

  socket.on("dealCards", function(data){
    // stubbed to only work on one person
    socket.emit("updateHand", randomHand(5));
  });

});

function randomHand(quantity){
  var newHand = []
  for(var i=0; i < quantity; i++ ){
    newHand.push(randomCard())
  }
  return newHand;
}

function randomCard(){
  var suits = ["hearts", "clubs", "spades", "diamonds"];
  var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
  return [{suit:_.sample(suits), value: _.sample(values)}]
}