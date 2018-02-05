const fs = require('fs');
let config_path = '../data/config';
let config 	= require(config_path);

var Worker = function () {};

Worker.prototype.getWorkers = function (callback) {
	callback(config.users);
}

// Export the module to the main application.
module.exports = new Worker();


