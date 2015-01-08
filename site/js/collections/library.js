var app = app || {};

var server = "http://";

app.Library = Backbone.Collection.extend({
	model: app.Book,
	url: "/api/books"
});