const fs = require('fs'),
	  http = require('http'),
	  btoa = require('btoa'),
	  atob = require('atob'),
	  StringDecoder = require('string_decoder').StringDecoder;
let config_path = '../data/config';
let config 	= require(config_path);

var Worker = function () {};

Worker.prototype.scan = function (ip, user, password,callback) {

	var auth = user+':'+password;
	var authorization = ['Authorization', auth]

	var exchangeoptions = {
		host: ip,
		auth: auth,
		headers: authorization,
		port: 80,
		path: '/cgi-bin/get_miner_status.cgi'
	};

	http.get(exchangeoptions, function(res){
		var decoder = new StringDecoder('utf8');
		res.on('data', function(chunk){
			chunk = decoder.write(chunk);
			callback(chunk)
		});
	}).on("error", function(e){
		//console.log("Got "+options.host+" error: " + e.message);
		err++;
	});
	

}



Worker.prototype.getStatus = function (ip, user, password, callback) {

	var auth = btoa(user+':'+password);

	let options = {
		host: ip,
		method:'GET',
		path: '/cgi-bin/get_miner_status.cgi'
	};



	let req = http.request(options);
	req.setHeader('authorization','Basic '+auth);
	req.end();

	req.on('data', (res, socket, head) => {
    	console.log('got connected!');

	    socket.on('data', (chunk) => {
			// callback( chunk );
	    });
	
 	});


}



Worker.prototype.getWorkers = function (callback) {
	callback(config.users);
}

// Export the module to the main application.
module.exports = new Worker();


