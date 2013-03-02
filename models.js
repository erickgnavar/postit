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

var Post = mongoose.model('Post', PostSchema);