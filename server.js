var express = require('express')
, mongoose = require('mongoose')
, app = express();

mongoose.connect('mongodb://theCoderFactory:angularjs@ds051848.mongolab.com:51848/angularjs_class');

var Schema = mongoose.Schema
, ObjectId = Schema.ObjectId
, itemSchema = new Schema({
	category: String,
	name: String,
	price: Number
});
var Item = mongoose.model('items',itemSchema);

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.static(__dirname + '/public/'));
app.set('views', __dirname + '/public/');
app.set('view engine', 'jade');
app.use(app.router);

app.get('/api/items', function (req,res) {
	Item.find().exec(function (err, items){
		res.json(items);
	});
});

app.post('/api/items', function (req,res) {
	Item.create(req.body.item, function (err, item) {
		if (err) {console.log(err); return res.send(500)};
		return res.json(item);
	});
});

app.put('/api/items/:id', function (req,res) {
	delete req.body.item._id;
	Item.findByIdAndUpdate(req.params.id, req.body.item, function (err, item) {
		if (err) {console.log(err); return res.send(500)};
		return res.json(item);
	})
});

app.delete('/api/items/:id', function (req,res) {
	Item.findByIdAndRemove(req.params.id, function (err) {
		if (err) {console.log(err); return res.send(500)};
		return res.send(200);
	});
});

app.get('*',function (req,res) {
	res.sendfile('public/index.html');
});

var port = process.env.PORT || 3000;
app.listen(port,
	function() {
		console.log("Server now listening on " + port)
	}
);