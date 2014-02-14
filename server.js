var express = require('express');
var app = express();

var mongoose = require('mongoose');
//var db = mongoose.createConnection('localhost','todo');

app.configure(function(){


	app.use(express.static(__dirname+'/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	mongoose.connect('mongodb://localhost/todo');

	});

var Todo = mongoose.model('model',{
	text : String 
	});

app.get('/api/todos',function(req,res){

	Todo.find(function(err,todos){
		
		if(err)
		    res.send(err)
		
		res.json(todos);	
		
		});
	});

app.post('/api/todos',function(req,res){
	
	Todo.create({
		text : req.body.text,
		done : false
		}, function(err,todo){ 
		
			if(err)
			     res.send(err);

	Todo.find(function(err,todos){
		if(err)
		    res.send(err)
		res.json(todos);

		});
	   });

	});


app.delete('/api/todos/:todo_id',function(req,res){
	Todo.remove({
		_id : req.params.todo_id
	  }, function(err, todo){
		if(err)
		   res.send(err);

	      Todo.find(function(err,todos){
		 if(err)
		   res.send(err)
		 res.json(todos);
		});
			
	});

	});

app.get('*',function(req,res){
	
	res.sendfile('./public/index.html');

	});


app.listen(9090);
console.log("Server Listening on http://localhost:9090");
