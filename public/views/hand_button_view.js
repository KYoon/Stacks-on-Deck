var HandButtonView = Backbone.View.extend({

  template: JST['templates/handButtons.tpl'],

  attributes: {
    class: "hand-buttons",
    style: "display: none;"
  },

  initialize: function(){
    this.listenTo(this.collection, 'cardActivate', this.show);
    this.listenTo(this.collection, 'cardDeactivate', this.hide);
    this.render();
  },

  events: {
    'click #hand-discard-button': 'discard',
    'click #hand-pass-button': 'passCard',
    'click #hand-play-button': 'playCard',
  },

  render: function() {
    this.$el.html(this.template);
  },

  show: function(){
    this.$el.show();
  },

  hide: function(){
    this.$el.hide();
  },

  discard: function(){
    hand.discard();
  },

  passCard: function(){
    $(".passing-player-list").show();
  },

  playCard: function(){
    hand.playCard();
  }

})
