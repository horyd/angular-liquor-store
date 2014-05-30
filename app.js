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
app.use(express.static(__dirname));
app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(app.router);

app.get('/api/items', function (req,res) {
	Item.find().exec(function (err, items){
		res.json(items);
	});
})

app.get('*',function (req,res) {
	res.sendfile('index.html');
});

var port = process.env.PORT || 3000;
app.listen(port,
	function() {
		console.log("Server now listening on " + port)
	}
);