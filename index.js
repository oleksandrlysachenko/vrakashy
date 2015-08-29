var express = require('express');
var app = express();

var port = 3030;

// ------------- Load Routes ------------- //
require('./routes/index')(app);


app.listen(port, function(){
   console.log('-> Server started on port: ' + port);
});