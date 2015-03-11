var CardView = Backbone.View.extend({
  cardDownTemplate: JST['templates/cardDown.jst'],

  initialize: function() {
    //Refactoring IMMINENT
    this.suit = this.model.get('suit');
    this.value = this.model.get('value').toLowerCase();

    this.color = cardColor(this.suit);
    this.cardTemplate = JST['templates/'+ this.value +'.jst'];

    this.listenTo(this.model, "change:faceUp", this.render);
    this.listenTo(this.model, "change:active", this.setClass);
  },

  attributes: {
    class: "card"
  },

  events: {
    "click": "activateCard",
    "dblclick": "flipCard",
    "doubletap": "flipCard",
    // "mouseup": "deactivateActiveCard"
  },

  activateCard: function(){
    this.model.setActive();
  },

  // deactivateActiveCard: function(e){
  //    var container = $(this).find(".card");
  //   if (!container.is(e.target) // if the target of the click isn't the container...
  //       && container.has(e.target).length === 0) // ... nor a descendant of the container
  //   {
  //       this.model.setInactive()
  //   }
  // },

  setClass: function(){
    if (this.model.get('active') === true) {
      this.$el.addClass("active");
    } else {
      this.$el.removeClass("active")
    }
  },

  render: function(){
    this.$el.addClass(this.color)
    if (this.model.get('faceUp') === true) {
      this.$el.html(this.cardTemplate({color: this.color, suit: "&"+ this.suit +";"}))
    } else {
      this.$el.html(this.cardDownTemplate)
    }
  },

  flipCard: function() {
    if (this.model.get('faceUp') === false) {
      this.model.set({faceUp: true})
    } else {
      this.model.set({faceUp: false})
    }
  }
})
