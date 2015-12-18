var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connection;
var http = require('http');
var server = http.createServer(app);
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoStore = require('connect-mongo')(session);

require('./config/development.js');

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

mongoose.connect(process.env.DB_HOST, process.env.DB_NAME, process.env.DB_PORT);

db.once('open', function() {

   console.log('Connection to ' + process.env.DB_NAME + ' is success');
   //console.log(process);


   app.use(session({
      //key: 'sessionID',
      secret: 'abcd1234few',
      resave: true,
      saveUninitialized: true,
      store: new mongoStore({
         host: process.env.DB_HOST,
         port: process.env.DB_PORT,
         db: process.env.DB_NAME,
         collection: 'Sessions',
         ssl: false,
         autoReconnect: true
      })
   }));

   //require('./routes/index')(app);

   server.listen(process.env.HTTP_PORT, function () {
      console.log('-> | Server started on port: ' + process.env.HTTP_PORT);
      console.log('   | Host: ' + process.env.HTTP_HOST);
      console.log('   | Database host: ' + process.env.DB_HOST)
   });
});

db.on('error', console.error.bind(console, 'connection error:'));