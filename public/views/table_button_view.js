var TableButtonView = Backbone.View.extend({

	events: {
		'click #table-get-card' : 'getCard',
		'click #table-discard-card' : 'discardCard',
		'click #collect-table-cards' : 'collectCards'
	},

	initialize: function() {
		this.tableButtonTemplate = window['JST']['templates/tableButtons.tpl'];
	},

	render: function() {
		this.$el.html(this.tableButtonTemplate);
	}, 

	getCard: function() {
		table.getCard(table.activeCard)
	},

	discardCard: function() {
		table.discardCard(table.activeCard)
	},

	collectCards: function(){
		table.collectCards()
	}

})