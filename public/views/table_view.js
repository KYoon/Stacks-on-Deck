var TableView = Backbone.View.extend({
  initialize: function() {
    // this.listenTo(this.collection, "change", this.render);
    this.listenTo(this.collection, "add", this.addOne)
  },

  events: {
    'click .card' : 'buttonDisplay',
    "flick": "flipCards"
  },

  attributes: {
    class: "table-cards"
  },

  render: function(){
    this.$el.empty();
    this.addAll();
  },

  addOne: function(card){
    // this.collection.unsetActiveCard();
    var view = new CardView({model: card});
    view.render();
    console.log(this.$el)
    this.$el.append(view.$el);
  },

  addAll: function(){
    this.collection.forEach(function(card) {
      this.addOne(card);
    }, this);
    return this;
  },

  flipCards: function(){
    this.collection.each(function(card) {
      card.flipCard()  
    })
  },


  buttonDisplay: function() {
    $('.table-buttons').empty();
    tableButtons = new TableButtonView();
    tableButtons.render();
    $('.table-buttons').append(tableButtons.$el);
  }
})
