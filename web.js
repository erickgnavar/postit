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
	socket.on('save-post', function (data){
		var post = JSON.parse(data);
		mongo.savePost(post, function (success) {
			if(success) {
				io.sockets.emit('new-post', post);
			}
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

app.post('/login/', function (request, response){
	var username = request.body.username;
	var password = request.body.password;
	var user = {
		'username': username,
		'password': password
	};
	mongo.login(user, function (success){
		if(success){
			response.send('login successfull');
		}else{
			response.send('problem with username or password');
		}
	});
});

app.get('/login', function (request, response) {
	response.render('login');
});

app.get('/logout', function (request, response) {
	response.redirect('/');
});

app.get('/admin/', function (request, response) {
	response.render('admin');
});

app.post('/post', function (request, response) {

	var Post = mongoose.model('Post');
	var post = new Post({
		title: request.body.title,
		author: 'Erick Navarro',
		content: request.body.content
	});
	post.save(function (err, post) {
		if (err) {
			console.log(err);
		}else {
			console.log(post);
		}
	});

});

app.get('/post', function (request, response){
	response.render('post_create');
});
