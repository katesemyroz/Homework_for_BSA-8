const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);

var messages = [], users = [];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res){
	res.sendFile(__dirname + '/main.html');
});

app.get('/script.js', function(req, res){
	res.sendFile(__dirname + '/script.js');	
})

app.get('/style.css', function(req, res){
	res.sendFile(__dirname + '/style.css');	
})

app.get('/messages', function(req, res){
	res.json(messages);	
})

app.post('/messages', function(req, res){
	if (messages.length >= 100){
		messages.shift(req.body);
		console.log('Message was deleted');
	}
	messages.push(req.body);
	console.log('Message was added');
	res.end();
})

app.get('/users', function(req, res){
	res.json(users);
})

app.post('/users', function(req, res){
	users.push(req.body);
	console.log('User was added');
	res.end();
})
	
app.listen(3000, function () {
  console.log('App listening on port 3000!');
});