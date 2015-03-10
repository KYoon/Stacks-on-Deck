var HandView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "change", this.render);
  },

  attributes: {
    class: "card-overlap"
  },

  render: function(){
    this.$el.empty();
    this.addAll();
  },

  addOne: function(card){
    var view = new CardView({model: card});
    view.render();
    this.$el.append(view.$el)
  },

  addAll: function(){
    console.log("hand view collection: " + this.collection);
    this.collection.forEach(function(card) {
      this.addOne(card);
    }, this);
    return this;
  }

})