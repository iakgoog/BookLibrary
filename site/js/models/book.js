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
	},
	initialize: function() {
		_.defaults(this, {
			keywords: new app.KeywordCollection()
		});
	},
	parse: function(response) {
		if (_.has(response, "keywords")) {
			this.keywords = new app.KeywordCollection(response.keywords, {
				parse: true
			});
			delete response.keywords;
		}
		return response;
	},
	toJSON: function() {
		var json = _.clone(this.attributes);
		json.keywords = this.keywords.toJSON();
		return json;
	}
	// parse: function(response) {
	// 	response.id = response._id;
	// 	return response;
	// }
});