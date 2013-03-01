module.exports = function(app, io) {

	app.get('/', function(req, res) {
		res.render('index', {title: 'Salas', manager: app.get('manager')});
	});
	
	app.get('/:room', function(req, res) {
		var manager = app.get('manager');
		var room = manager.getRoom(req.params.room);
		if (room === null) {
			manager.addRoom(req.params.room);
			room = manager.getRoom(req.params.room);
		}
		res.render('voting', {title: room.name, room: room});
	});

	app.get('/:room/destroy', function(req, res) {
		var room = app.get('manager').getRoom(req.params.room);
		if (room) {
			return res.render('destroy', {title: room.name, room: room});
		}
		res.redirect('/');
	});

	app.post('/:room/destroy', function(req, res) {
		var manager = app.get('manager');
		manager.destroyRoom(req.params.room);
		res.redirect('/');
	});
}