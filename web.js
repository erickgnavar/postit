var express = require('express');
var app = express();

var mongo = require('./mongo');

var port = process.env.PORT || 3000;

var server = app.listen(3000);

var io = require('socket.io').listen(server, {log: false});

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
	mongo.getPosts(function (posts){
		if(posts){
			response.render('home', {posts: posts});
		}
		else
			response.send('hola');
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

app.post('/post/', function (request, response) {
	var post = {
		'title' : request.body.title,
		'author' : 'Erick Navarro',
		'content' : request.body.content
	};
	mongo.savePost(post, function (success) {
		if(success){
			response.redirect('/');
		}else{
			response.send('BAD');
		}
	});
});

app.get('/post', function (request, response){
	response.render('new_post');
});
