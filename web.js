var express = require('express');
var app = express();

var mongo = require('./mongo');

var port = process.env.PORT || 3000;

var server = app.listen(port);

var mongoose = require('mongoose');
require('./models');


var io = require('socket.io').listen(server, {log: false});
io.configure(function () {
	io.set('transports', ['xhr-polling']);
	io.set('polling duration', 10);
});

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.bodyParser());
app.use(express.compress());

app.use('/static', express.static(__dirname + '/static'));

io.sockets.on('connection', function (socket){
	socket.on('save post', function (data){
		var Post = mongoose.model('Post');
		var post = new Post(JSON.parse(data));
		post.save(function (err, post) {
			io.sockets.emit('new post', post);
		});
	});
});


app.get('/', function (request, response) {

	var Post = mongoose.model('Post');

	Post.find(function (err, posts) {
		response.render(
			'home', {
				posts: posts
			}
		);
	});

});