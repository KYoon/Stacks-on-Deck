var HeaderView = Backbone.View.extend({
  initialize: function() {
      this.headerTemplate = window['JST']['templates/header.tpl'];
    },

    render: function() {
      this.$el.html(this.headerTemplate);
    }
  })