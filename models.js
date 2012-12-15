var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		'default': Date.now
	}
});

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		'default': Date.now
	}
});

var User = mongoose.model('User', UserSchema);
var Post = mongoose.model('Post', PostSchema);