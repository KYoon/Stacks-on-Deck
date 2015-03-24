$(document).on("ready", function() {
  var roomkeyField = document.getElementById('roomkey');
  var roomkeyTableField = document.getElementById('roomkey-table');

  formatRoomKey = function (){
    this.value = this.value.toUpperCase().split(" ").join("-");
    if (this.value.length > 10) {
      this.value = this.value.slice(0,9);
    }
  }

  roomkeyField.onkeyup = formatRoomKey;
  roomkeyTableField.onkeyup = formatRoomKey;

  var form = document.getElementById("join-create")
  form.onsubmit = function () {
    if (roomkeyField.value.slice(-1) === "-"){
      roomkeyField.value = roomkeyField.value.slice(0,-1);
    }
  }

  $(document).on("click", "#connect-table", function(e) {
      e.preventDefault();
      $(".user-signin").hide();
      $(".table-signin").show();
  })

  $(document).on("click", "#return-user-signin", function(e) {
      e.preventDefault();
      $(".table-signin").hide();
      $(".user-signin").show();
  })
})