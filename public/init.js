$(document).ready(function() {
  var mainpage = new MainPage();
  mainpage.render();
  $("body").append(mainpage.el)
})
