var express = require('express');
var mongoose = require('mongoose');
var db = mongoose.connection;
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoStore = require('connect-mongo')(session);
var app = express();
var port = 3030;
var dbConfig = {

};

mongoose.connect('localhost','VrakashyDB',27017);

app.use(cookieParser());
app.use(session({
   key: 'sessionID',
   secret: 'abcd1234few',
   resave: true,
   saveUninitialized: true,
   store: new mongoStore({
      host: 'localhost',
      port: 27017,
      db: 'VrakashyDB',
      collection: 'session'
   })
}));
/*app.use(function(req,res,next){
   var cook = req.cookies.cookieName;
   if (cook === undefined)
   {
      // no: set a new cookie
      var randomNumber=Math.random().toString();
      randomNumber=randomNumber.substring(2,randomNumber.length);
      res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
      console.log('cookie created successfully');
   }
   else
   {
      // yes, cookie was already present
      console.log('cookie exists', cook);
   }
   next(); // <-- important!
}); */
app.use(express.static(__dirname + '/public'));

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