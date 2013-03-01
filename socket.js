module.exports = function(app, io) {
	var manager = app.get('manager');

	var broadcast_info = function(socket, room) {
		socket.broadcast.emit('info', {room: manager.getRoom(room)});
		socket.emit('info', {room: manager.getRoom(room)});
	}

	io.sockets.on('connection', function(socket) {
		socket.on('enter', function(data) {
			if (data !== null && data.name !== null) {
				manager.addUserToRoom(data.room, data.name);
			}
			broadcast_info(socket, data.room);
		});

		socket.on('vote', function(data) {
			manager.setVote(data.room, data.user, data.vote);
			broadcast_info(socket, data.room);
		});

		socket.on('clear_votes', function(data) {
			manager.clearVotes(data.room);
			broadcast_info(socket, data.room);
		});
	});
}