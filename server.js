var express = require('express');
var app = express();
var port = 3030;
var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect('localhost','VrakashyDB',27017);

db.once('open', function() {

   require('./models');
   require('./routes/index')(app);

   app.use(express.static(__dirname + '/public'));

   app.listen(port, function () {
      console.log('-> Server started on port: ' + port);
   });
});

db.on('error', function(err) {
   console.error(err);
});