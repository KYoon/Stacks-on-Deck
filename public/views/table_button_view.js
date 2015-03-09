var TableButtonView = Backbone.View.extend({

	initialize: function() {
		this.tableButtonTemplate = window['JST']['templates/tableButtons.tpl'];
	},

	render: function() {
		this.$el.html(this.tableButtonTemplate);
	}


})