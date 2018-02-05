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
	app		= express(), port;

var Workers	= require('./lib/worker.manager'),
	Users	= require('./lib/user.manager');

rand({from: 2000, range: 2000}, function (p) { port = p; });
	
const go = {
	pagename: 'Automine',
	currencies: currencies,
	host: '//localhost',
	socket: port
}

go.socketURI = go.host+':'+go.socket+'/socket.io/socket.io.js';

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


	app.get('/', function (req, res) {
		if ( Users.loggedIn(req.cookies.auth) ) {
			res.render('index', go);
		} else { 
			res.redirect(301, '/login');
		}
	});

	app.get('/:page', function (req, res) {
		if ( Users.loggedIn(req.cookies.auth) ) {
			res.render(req.params.page, go);
		} else { 
			res.redirect(301, '/login');
		}
	});

	app.get('/login', function (req, res) {
		res.render('login', go);
	});

	app.get('/signup', function (req, res) {
		res.render('signup', go);
	});




	app.post('/signup', function (req, res) {
		Users.setup( req.body, function (loggedIn, token) {
			if ( loggedIn == true ) res.cookie('auth', token);
			res.redirect(301,'/');
		});
	}); 

	app.post('/login', function (req, res) {
		Users.login( req.body, function (loggedIn, token) {
			if ( loggedIn == true ) res.cookie('auth', token);
			res.redirect(301,'/');
		});
	});

	app.get('/logout', function (req, res) {
		res.clearCookie('auth');
		res.redirect(301,'/');
	});

	app.post('/passwordreset', function (req, res) {
		var email = req.body.email1;
		console.log(email);
	});

	app.get('/api/:option', function (req ,res) {
		Workers.getWorkers(function(workers) {
			res.send(workers);
		})
	});

// This is where all the magic happens!
let io 		= require('socket.io')(port);
io.on('connection', function (socket) {

	socket.on('console', function (data) {
		console.log(data);
	});

	socket.on('disconnect', function (data) {

	});
});




app.listen(4555);