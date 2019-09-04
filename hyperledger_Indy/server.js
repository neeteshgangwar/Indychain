var express = require('express'),
  app = express(),
  port = process.env.PORT || 8000,
  bodyParser = require('body-parser');
  const mongoose = require('mongoose');
  const async= require('async')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/hyperledger',{useNewUrlParser: true}, async function(err) {
    if (err) throw err;
 
   await console.log('Successfully connected');
});

var routes = require('./routes/route'); //importing route
routes(app); //register the route

                             

app.listen(port);
console.log('RESTful API server started on: ' + port);