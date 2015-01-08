var app = app || {};

app.Keyword = Backbone.RelationalModel.extend({
	idAttribute: "_id",
	defaults: {
		title: "No Keyword"
	}
});