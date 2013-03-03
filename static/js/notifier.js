var socket = io.connect('/');

socket.on('new post', function (post) {
	addPost(post);
});
socket.on('drop post', function (pk) {
	removePost(pk);
});

$(document).on('ready', function(){
	$('#save-post-btn').on('click', function (e) {
		e.preventDefault();
		var title = $('#title').val();
		var content = $('#content').val();
		var author = $('#author').val();
		var post = {
			title: title,
			content: content,
			author: author
		};
		socket.emit('save post', JSON.stringify(post));
		$('#title').val('');
		$('#content').val('');
		$('#author').val('');
		$('#new-post').modal('hide');
	});
	$('.postit a').on('click', hidePost);
});

var hidePost = function (e) {
	e.preventDefault();
	var pk = $(this).data('pk');
	socket.emit('delete post', {pk: pk});
};

var addPost = function (post) {
	var txt = '<li class="postit">';
	txt += '<span class="pull-right"><a href="#" data-pk="';
	txt += post._id;
	txt += '"><i class="icon-trash"></i></a></span>';
	txt += '<h2 >' + post.title + '</h2>';
	txt += '<p>' + post.content + '</p>';
	txt += '<i>' + post.author + '</i>';
	txt += '</li>';
	$('#posts').prepend(txt);
	$('#posts li:first-child').hide().fadeIn('slow');
	$('.postit a').on('click', hidePost);
};

var removePost = function (pk) {
	var li = $('a[data-pk="' + pk + '"]');
	li.parent().parent().fadeOut();
};