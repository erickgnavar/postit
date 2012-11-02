var mongo = require('mongodb');

var mongo_options = {
	safe: false,
	auto_reconnect: true,
	poolSize: 5
};

var server = new mongo.Server('mongodb://erickxls:olimpo30@ds041387.mongolab.com/postit', 41387, {});
var db = new mongo.Db('postit', server);

var savePost = function (post, callback){
	db.open(function (error, db){
		if(!error){
			db.collection('post', function (error, collection){
				if(!error){
					collection.insert(post, function (error){
						if(!error){
							callback(true);
							console.log('Success: ' + post);
							db.close();
						}else{
							callback(false);
							console.error('Error: ' + error.stack);
							db.close();
						}
					});
				}else{
					callback(false);
					console.error('Error: ' + error.stack);
					db.close();
				}
			});
		}else{
			callback(false);
			console.error('Error: ' + error.stack);
			db.close();
		}
	});
};

var removePost = function (post_id, callback){
	db.open(function (error, db){
		if(!error){
			db.collection('post', function (error, collection){
				if(!error){
					collection.remove({id: post_id}, function (error){
						if(!error){
							callback(true);
							db.close();
						}else{
							callback(false);
							console.error('Error: ' + error.stack);
							db.close();
						}
					});
				}else{
					callback(false);
					console.error('Error: ' + error.stack);
					db.close();
				}
			});
		}else{
			callback(false);
			console.error('Error: ' + error.stack);
			db.close();
		}
	});
};

var getPosts = function (callback){
	db.open(function (error, db){
		if(!error){
			console.log('connection opened');
			db.collection('post', function (error, collection){
				if(!error){
					collection.find().sort({_id: -1}).limit(15).toArray(function (error, items){
						if(!error){
							if(items.length === 0){
								callback(posts);
								db.close();
							}else{
								var posts = [];
								items.forEach(function (post){
									posts.push(post);
								});
								callback(posts);
								db.close();
							}
						}else{
							callback(false);
							console.error('Error: ' + error.stack);
							db.close();
						}
					});
				}else{
					callback(false);
					console.error('Error: ' + error.stack);
					db.close();
				}
			});
		}else{
			callback(false);
			console.error('Error: ' + error.stack);
			db.close();
		}
	});
};

var login = function (user, callback){
	db.open(function (error, db){
		if(!error){
			db.collection('user', function (error, collection){
				if(!error){
					collection.findOne({username: user.username}, function (error, item){
						if(!error){
							if(user.password === item.password){
								callback(true);
								db.close();
							}else{
								callback(false);
								console.log('password not found');
								db.close();
							}
						}else{
							callback(false);
							console.error('Error: ' + error.stack);
							db.close();
						}
					});
				}else{
					callback(false);
					console.error('Error: ' + error.stack);
					db.close();
				}
			});
		}else{
			callback(false);
			console.error('Error: ' + error.stack);
			db.close();
		}
	});
};

module.exports.savePost = savePost;
module.exports.getPosts = getPosts;
module.exports.login = login;
module.exports.removePost = removePost;