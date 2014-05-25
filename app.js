var express = require('express')
, app = express();

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.static(__dirname));
app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(app.router);

app.get('*',function (req,res) {
	res.sendfile('index.html');
});

var port = process.env.PORT || 3000;
app.listen(port,
	function() {
		console.log("Server now listening on " + port)
	}
);