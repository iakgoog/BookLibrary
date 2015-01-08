var application_root = __dirname,
	express = require("express"),
	path = require("path"),
	mongoose = require("mongoose");

var app = express();

app.configure(function() {
	app.use(express.bodyParser());

	app.use(express.methodOverride());

	app.use(app.router);

	app.use(express.static(path.join(application_root, 'site')));

	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

var port = 4723;

app.listen(port, function() {
	console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});

// Routes
app.get("/api", function(request, response) {
	response.send("Library API is running");
});

// Connect to database
mongoose.connect("mongodb://localhost/onetrack");

//Schemas
var ListCard = new mongoose.Schema({
	title: String,
	order: Number,
	parent: String
});

var List = new mongoose.Schema({
	title: String,
	order: Number,
	tmpTitle: String,
	tmpCardTitle: String,
	listCards: [ListCard]
});

// Models
var ListModel = mongoose.model("List", List);

app.get("/api/lists", function(request, response) {
	return ListModel.find(function(err, lists) {
		if (!err) {
			return response.send(lists);
		} else {
			return console.log(err);
		}
	});
});

// Insert a new list
app.post("/api/lists", function(request, response) {
	var list = new ListModel({title: request.body.title,
		order: request.body.order,
		tmpTitle: request.body.tmpTitle,
		tmpCardTitle: request.body.tmpCardTitle,
		listCards: request.body.listCards
	});
	list.save(function(err) {
		if (!err) {
			return console.log("created");
		} else {
			return console.log(err);
		}
	});
	return response.send(list);
});

//Get a single list by id
app.get( '/api/lists/:id', function( request, response ) {
	return ListModel.findById( request.params.id, function( err, list ) {
		if( !err ) {
			return response.send( list );
		} else {
			return console.log( err );
		}
	});
});

//Update a list
app.put( '/api/lists/:id', function( request, response ) {
	console.log( 'Updating list ' + request.body.title );
	return ListModel.findById( request.params.id, function( err, list ) {
		list.title = request.body.title,
		list.order = request.body.order,
		list.tmpTitle = request.body.tmpTitle,
		list.tmpCardTitle = request.body.tmpCardTitle,
		list.listCards = request.body.listCards
		return list.save( function( err ) {
			if( !err ) {
				console.log( 'list updated' );
			} else {
				console.log( err );
			}
			return response.send( list );
		});
	});
});

// Delete a list
app.delete('/api/lists/:id', function(request, response) {
	console.log('Deleting list with id: ' + request.params.id);
	return ListModel.findById(request.params.id, function(err, list) {
		return list.remove(function(err) {
			if (!err) {
				console.log('List removed');
				return response.send('');
			} else {
				console.log(err);
			}
		});
	});
});