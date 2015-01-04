var
	express 		= require('express');
	http 			= require('http'),
	fs 			    = require('fs'),
	_ 				= require('underscore'),
	cors 			= require('cors'),
	colors 		    = require('colors'),
	pdf 			= require('./routes/pdf'),
	word 			= require('./routes/word')
	download 	    = require('./routes/download')
	;

var app = express();
app.set('port', process.env.PORT || 80);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(cors());
app.use(app.router);

if ('development' == app.get('env')) app.use(express.errorHandler());

var Firebase = require('firebase');
var firebase = new Firebase('https://sbc.firebaseio.com/');
firebase.auth('BSfylnGp0fa2EDFrVFe0xYInZg6ebowMsSn7Pz04', function(error){
	if(error)
		return console.log("Firebase error".blue, error);
	else
		return console.log("Firebase authorised".green);
})


//Routes
app.get('/', function(req, res){
	res.send({'ping' : true})
})

app.get('/pdf/:id', function(req, res){
	download(req, res, 'pdf')
})

app.get('/word/:id', function(req, res){
	download(req, res, 'docx')
})

app.post('/pdf_convert', function(req, res){
	pdf(req, res, firebase)
});

app.post('/word_convert', function(req, res){
	word(req, res, firebase)
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
