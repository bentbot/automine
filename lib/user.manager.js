var fs = require('fs'),
	bcrypt = require('bcrypt'),
	config_path = '../data/config',
	random = require('randomstring'),
	config 	= require(config_path),
	saltRounds = 10,
	Online = [];

var User = function () {};

User.prototype.setup = function (request, callback) {

	var salt = bcrypt.genSaltSync(saltRounds);
	let pass = bcrypt.hashSync(request.password, salt);

	let user = {
		username: request.username,
		email: request.email,
		password: pass
	}

	config.users.push(user);

	callback(false, request);

}


User.prototype.login = function (request, callback) {

	let loggedIn = false, token = false;

	for (var i = config.users.length - 1; i >= 0; i--) {
	
		if ( config.users[i].email == request.username || config.users[i].username == request.username ) {

			var match = bcrypt.compareSync(request.password, config.users[i].password);

			if ( match == true || config.users[i].password == request.password ) {
	
				loggedIn = true;

				var salt = bcrypt.genSaltSync(saltRounds);
				token = bcrypt.hashSync(request.password, salt);

			}
		}
	}

	callback(loggedIn, token);
}


User.prototype.changePassword = function (request, callback) {
	let newPassword = null, updated=config;
	var salt = bcrypt.genSaltSync(saltRounds);
	
	for (var i = updated.users.length - 1; i >= 0; i--) {
		if ( updated.users[i].email == request.username || updated.users[i].username == request.username ) {
			newPassword = random.generate()
			newPassword = bcrypt.hashSync(newPassword, salt);
			updated.users[i].password = newPassword;


		}
	}

	if ( updated != config ) {
		fs.writeFile(config_path, JSON.stringify(updated), (err) => {
			if (err) throw (err)
			callback(newPassword);
		});		
	} else {
		callback(false);
	}
}


User.prototype.loggedIn = function (auth) {
	return (auth) ? true : false;
}

User.prototype.getUsers = function (callback) {

	callback(config.users);

}

// Export the module to the main application.
module.exports = new User();