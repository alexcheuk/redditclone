var http = require('http'),
	express = require('express'),
	app = express(),
	model = require('./model'),
	controller = require('./controller');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// app.use(express.cookieParser('some secret here'));
// app.use(express.session());
app.use(express.bodyParser());
app.use(express.methodOverride());
// app.use(express.logger());
app.use(express.static(__dirname + '/public'));


/* ROUTING */
app.post('/register', controller.users.create_user);

/* HELPER */
app.post('/register/check_valid_email',  controller.users.check_valid_email)


/* FALLBACK */
app.use('/', function(req, res){
	res.render('login');
});

app.use(function(req, res, next){
  res.status(404).send('404');
});

app.listen(8889)
