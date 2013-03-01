function RoomManager() {
	this.rooms = [];
}

RoomManager.createManager = function() {
	return new RoomManager();
}

RoomManager.prototype.getRoom = function(name) {
	if (name in this.rooms) {
		return this.rooms[name];
	}
	return null;
}

RoomManager.prototype.setVote = function(room, user, vote) {
	var room = this.getRoom(room);
	if (room) {
		room.users[user].vote = vote;
	}
	return room;
}

RoomManager.prototype.allVoted = function(room) {
	var room = this.getRoom(room);
	if (room) {
		for (var user in room.users) {
			if (room.users[user].vote === null) return false;
		}
		return true;
	}
	return false;
}

RoomManager.prototype.clearVotes = function(room) {
	var room = this.getRoom(room);
	if (room) {
		for (var user in room.users) {
			room.users[user].vote = null;
		}
	}
	return room;
}

RoomManager.prototype.addRoom = function(name) {
	this.rooms[name] = {name: name, users: {}};
	return this.getRoom(name);
}

RoomManager.prototype.addUserToRoom = function(name, user) {
	var room = this.getRoom(name);
	if (room) {
		room.users[user] = {name: user, vote: null};
		return room;
	}
	return null;
}

RoomManager.prototype.forEachRoom = function(callback) {
	for (var room in this.rooms) {
		callback(this.getRoom(room));
	}
}

module.exports = RoomManager