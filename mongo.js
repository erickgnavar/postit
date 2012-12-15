var mongoose = require('mongoose');

var URI = process.env.MONGODB_URI ||
			process.env.MONGOLAB_URI ||
			'mongodb://localhost/postit';

var options = {
	db: {
		safe: true
	}
};

var db = mongoose.connect(URI, options, function (err, res) {
	if(err)
		console.log('Error: ', err);
	else
		console.log('Connected to: ', URI);
});


