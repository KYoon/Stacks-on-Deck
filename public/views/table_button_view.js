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
		table.getCard(table.activeCard.toString())
	},

	discardCard: function() {
		table.discardCard(table.activeCard.toString())
	},

	collectCards: function(){
		table.collectCards()
	}

})