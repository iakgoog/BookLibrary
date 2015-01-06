var app = app || {};

app.LibraryView = Backbone.View.extend({
	el: "#books",
	initialize: function(initialBooks) {
		this.collection = new app.Library(initialBooks);
		this.listenTo(this.collection, "add", this.renderBook);
		this.render();
	},
	render: function() {
		this.collection.each(function(item) {
			this.renderBook(item);
		}, this);
	},
	renderBook: function(item) {
		console.log(item);
		var bookView = new app.BookView({
			model: item
		});
		this.$el.append(bookView.render().el);
	},
	events: {
		"click #add": "addBook"
	},
	addBook: function(e) {
		e.preventDefault();
		var formData = {};
		$("#addBook div").children("input").each(function(i, el) {
			if ($(el).val() != "") {
				formData[el.id] = $(el).val();
				console.log($(el).val());
			}
		});
		console.log(formData);
		this.collection.add(new app.Book(formData));
	}
});