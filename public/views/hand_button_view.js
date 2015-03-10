var HandButtonView = Backbone.View.extend({

  template: JST['templates/handButtons.tpl'],

  events: {
    'click #hand-discard-button': 'discard',
    'click #hand-pass-button': 'passCard',
    'click #hand-play-button': 'playCard',
  },

  render: function() {
    this.$el.html(this.template)
  },

  discard: function(){

  },

  passCard: function(){
    $(".passing-player-list").show();
  },

  playCard: function(){

  }

})
