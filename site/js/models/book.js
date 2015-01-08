var app = app || {};

app.Book = Backbone.RelationalModel.extend({
	idAttribute: "_id",
	relations: [{
		type: Backbone.HasMany,
		key: 'keywords',
		relatedModel: 'app.Keyword',
		collectionType: 'app.KeywordCollection',
		reverseRelation: {
			key: 'parent',
			includeInJSON: '_id'
		}
	}],
	defaults: {
		coverImage: "img/placeholder.png",
		title: "No title",
		author: "Unknown",
		releaseDate: "Unknown",
		keywords: []
	}
});