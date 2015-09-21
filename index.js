var express = require('express');
var app = express();
var port = 3030;
var mongoose = require('mongoose');
var db = mongoose.connection;

require('./models');
// ------------- Load Routes ------------- //
require('./routes/index')(app);

mongoose.connect('localhost','VrakashyDB',27017);

db.on('error', function(err) {
   console.error(err);
});

db.once('open', function() {
   app.listen(port, function () {
      console.log('-> Server started on port: ' + port);
   });
});