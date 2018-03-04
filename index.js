var fs 		= require('fs'),
	pug  	= require('pug'),
	express	= require('express'),
	cons 	= require('consolidate'),
	rand 	= require('random-port'),
	body  	= require('body-parser'),
	cookie 	= require('cookie-parser'),
	config 	= require('./data/config'),
	exphbs  = require('express-handlebars'),
	currencies = require('./data/currencies'),
	app		= express(), port, pot=4445;

var Workers	= require('./lib/worker.manager'),
	Users	= require('./lib/user.manager');

var vars = {
	pagename: 'Automine',
	currencies: currencies,
	host: '//localhost',
	socket: port
}

vars.socketURI = vars.host+':'+vars.socket+'/socket.io/socket.io.js';

// app.set('view engine', 'pug') // Pug / Jade
app.engine('html', cons.swig)  // Plain HTML / Swig
app.set('view engine', 'html');// ^
// app.engine('handlebars', exphbs({ defaultLayout: 'main' })); // Handlebars
// app.set('view engine', 'handlebars');

app.use(cookie());
app.use(body.json());
app.use(body.urlencoded({ extended: true }));

app.set('views', __dirname + '/dist');
app.use('/assets', express.static(__dirname + '/dist/assets'));
app.use('/css', express.static(__dirname + '/dist/css'));
app.use('/fonts', express.static(__dirname + '/dist/fonts')); 
app.use('/js', express.static(__dirname + '/dist/js'));
	
	/* GET */
	
	app.get('/scan', function (req, res) {
		let ip = '192.168.1.13'
		let user = 'root'
		let password = 'root'
		Workers.scan(ip, user, password, function(data) {
			res.send(data);
		});
	});

	app.get('/api/:option', function (req, res) {
		ip = '192.168.1.13'
		user = 'root'
		password = 'root'
		Workers.getStatus(ip, user, password, function(data) {
			res.send(data);
		})
	});

	/** POST **/
	app.post('/signup', function (req, res) {
		Users.setup( req.body, function (loggedIn, token) {
			if ( loggedIn == true ) res.cookie('auth', token);
		});
	}); 

	app.post('/login', function (req, res) {
		Users.login( req.body, function (loggedIn, token) {
			if ( loggedIn == true ) res.cookie('auth', token);
			res.redirect('/');
		});
	});

	app.post('/passwordreset', function (req, res) {
		var email = req.body.email1;
		console.log(email);
	});

	







let io = require('socket.io')(port);
io.on('connection', function (socket) {

	socket.on('console', function (data) {
		console.log(data);
	});

	socket.on('disconnect', function (data) {

	});
});









console.log('Listening on '+pot)
app.listen(pot);