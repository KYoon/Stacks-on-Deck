this["JST"] = this["JST"] || {};

this["JST"]["templates/10.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += ' <div class="card rank-10 ' +
((__t = ( suit )) == null ? '' : __t) +
'">\n    <span class="rank">10</span>\n    <span class="suit">&' +
((__t = ( suit )) == null ? '' : __t) +
';</span>\n</div>';

}
return __p
};

this["JST"]["templates/2.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += ' <div class="card rank-2 ' +
((__t = ( suit )) == null ? '' : __t) +
'">\n    <span class="rank">2</span>\n    <span class="suit">&' +
((__t = ( suit )) == null ? '' : __t) +
';</span>\n</div>';

}
return __p
};

this["JST"]["templates/3.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += ' <div class="card rank-3 ' +
((__t = ( suit )) == null ? '' : __t) +
'">\n    <span class="rank">3</span>\n    <span class="suit">&' +
((__t = ( suit )) == null ? '' : __t) +
';</span>\n</div>';

}
return __p
};

this["JST"]["templates/4.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += ' <div class="card rank-4 ' +
((__t = ( suit )) == null ? '' : __t) +
'">\n    <span class="rank">4</span>\n    <span class="suit">&' +
((__t = ( suit )) == null ? '' : __t) +
';</span>\n</div>';

}
return __p
};

this["JST"]["templates/5.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += ' <div class="card rank-5 ' +
((__t = ( suit )) == null ? '' : __t) +
'">\n    <span class="rank">5</span>\n    <span class="suit">&' +
((__t = ( suit )) == null ? '' : __t) +
';</span>\n</div>';

}
return __p
};

this["JST"]["templates/6.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += ' <div class="card rank-6 ' +
((__t = ( suit )) == null ? '' : __t) +
'">\n    <span class="rank">6</span>\n    <span class="suit">&' +
((__t = ( suit )) == null ? '' : __t) +
';</span>\n</div>';

}
return __p
};

this["JST"]["templates/7.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += ' <div class="card rank-7 ' +
((__t = ( suit )) == null ? '' : __t) +
'">\n    <span class="rank">7</span>\n    <span class="suit">&' +
((__t = ( suit )) == null ? '' : __t) +
';</span>\n</div>';

}
return __p
};

this["JST"]["templates/8.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += ' <div class="card rank-8 ' +
((__t = ( suit )) == null ? '' : __t) +
'">\n    <span class="rank">8</span>\n    <span class="suit">&' +
((__t = ( suit )) == null ? '' : __t) +
';</span>\n</div>';

}
return __p
};

this["JST"]["templates/9.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += ' <div class="card rank-9 ' +
((__t = ( suit )) == null ? '' : __t) +
'">\n    <span class="rank">9</span>\n    <span class="suit">&' +
((__t = ( suit )) == null ? '' : __t) +
';</span>\n</div>';

}
return __p
};

this["JST"]["templates/ace.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="card rank-a ' +
((__t = ( suit )) == null ? '' : __t) +
'">\n    <span class="rank">A</span>\n    <span class="suit">&' +
((__t = ( suit )) == null ? '' : __t) +
';</span>\n</div>';

}
return __p
};

this["JST"]["templates/cardDown.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="card back">*</div>\n';

}
return __p
};

this["JST"]["templates/hand.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="player-hand">\n</div>\n';

}
return __p
};

this["JST"]["templates/handButtons.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="single-hand-button"><button class="btn btn-default" id="hand-discard-button" >Discard</button></div>\n<div class="single-hand-button"><button class="btn btn-default" id="hand-pass-button" >Pass</button></div>\n<div class="single-hand-button"><button class="btn btn-default" id="hand-play-button">Play</button></div>\n';

}
return __p
};

this["JST"]["templates/header.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<nav class="navbar navbar-default">\n  <div class="container-fluid">\n    <div class="room-key-div">\n    <div><p class="navbar-brand">Room: ' +
((__t = ( userData.roomkey )) == null ? '' : __t) +
'</p></div>\n\n      <div class="navbar-inner">\n        <div class="navbar-center inline">\n      <p>Stacks on Deck</p>\n    </div>\n  </div>\n  </div>\n</nav>';

}
return __p
};

this["JST"]["templates/jack.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += ' <div class="card rank-j ' +
((__t = ( suit )) == null ? '' : __t) +
'">\n    <span class="rank">J</span>\n    <span class="suit">&' +
((__t = ( suit )) == null ? '' : __t) +
';</span>\n</div>';

}
return __p
};

this["JST"]["templates/king.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += ' <div class="card rank-k ' +
((__t = ( suit )) == null ? '' : __t) +
'">\n    <span class="rank">K</span>\n    <span class="suit">&' +
((__t = ( suit )) == null ? '' : __t) +
';</span>\n</div>';

}
return __p
};

this["JST"]["templates/passingPlayer.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a class="pass-to" id="' +
((__t = ( username )) == null ? '' : __t) +
'" href="#">' +
((__t = ( username )) == null ? '' : __t) +
'</a>';

}
return __p
};

this["JST"]["templates/player.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( username )) == null ? '' : __t);

}
return __p
};

this["JST"]["templates/queen.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += ' <div class="card rank-q ' +
((__t = ( suit )) == null ? '' : __t) +
'">\n    <span class="rank">Q</span>\n    <span class="suit">&' +
((__t = ( suit )) == null ? '' : __t) +
';</span>\n</div>';

}
return __p
};

this["JST"]["templates/tableButtons.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<button class="btn btn-default" id="table-get-card">Get Card</button>\n<button class="btn btn-default" id="table-discard-card">Discard Card</button>\n<button class="btn btn-default" id="collect-table-cards">Take All Cards</button>';

}
return __p
};