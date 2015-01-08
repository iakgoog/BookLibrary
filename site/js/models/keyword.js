var app = app || {};

app.Keyword = Backbone.Model.extend({
	idAttribute: "_id",
	defaults: {
		title: "No Keyword"
	}
});