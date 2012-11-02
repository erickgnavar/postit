var socket = io.connect('http://postit.herokuapp.com');

socket.on('new-post', function (post){
	addPost(post);
});

$(document).on('ready', function(){
	$('#form-new-post').on('submit', function (e) {
		e.preventDefault();
		var title = $(this).find('#title').val();
		var content = $(this).find('#content').val();
		var post = {
			title: title,
			content: content,
			author: 'Benito'
		};
		socket.emit('save-post', JSON.stringify(post));
		return false;
	});
});

var addPost = function (post) {
	var txt = '<li class="postit">';
	txt += '<h2 >' + post.title + '</h2>';
	txt += '<p>' + post.content + '</p>';
	txt += '<i>' + post.author + '</i>';
	txt += '</li>';
	$('#posts').prepend(txt);
	$('#posts li:first-child').hide().fadeIn('slow');
};