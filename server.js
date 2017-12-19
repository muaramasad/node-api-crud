// server.js

const port = 8000;

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./app/config/db');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(db.url, function(err,database){
	if(err) return console.log(err)
	require('./app/routes')(app, database);
	app.listen(port, function(){
		console.log("server are live on" + port);
	});
})