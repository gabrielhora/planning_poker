module.exports = function(app, io) {

	// List all rooms
	app.get('/', function(req, res) {
		var manager = app.get('manager');
		var room = manager.getRoom('picpay');
		res.render('voting', {title: room.name, room: room});
	});

}