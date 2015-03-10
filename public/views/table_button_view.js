var TableButtonView = Backbone.View.extend({

	events: {
		'click #table-get-card' : 'getCard',
		'click #table-discard-card' : 'discardCard',
		'click #collect-table-cards' : 'collectCards'
	},

	initialize: function() {
		this.tableButtonTemplate = JST['templates/tableButtons.tpl'];
	},

	render: function() {
		this.$el.html(this.tableButtonTemplate);
	},

	getCard: function() {
		table.getCard(table.activeCard.attributes.id);
	},

	discardCard: function() {
		table.discardCard(table.activeCard.attributes.id);
	},

	collectCards: function(){
		table.collectCards();
	}

})
