var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoStore = require('connect-mongo')(session);
var serverLog = require('morgan');
var app = express();
var http = require('http');
var server = http.createServer(app);

require('./config/development');

mongoose.connect(process.env.DB_HOST, process.env.DB_NAME, process.env.DB_PORT);
var db = mongoose.connection;

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(serverLog('dev'));
app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({ extended: false }));

db.once('open', function() {

    console.log('Connection to ' + process.env.DB_NAME + ' is succeed');

    app.use(session({
        secret: 'abcd1234few',
        resave: true,
        saveUninitialized: true,
        store: new mongoStore({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            db: process.env.DB_NAME,
            collection: 'Sessions'
        })
    }));

    require('./routes/index')(app, db);

    server.listen(process.env.HTTP_PORT, function () {
        console.log('Server start succeed');
        console.log('   | Server host: ' + process.env.HTTP_HOST);
        console.log('   | Server port: ' + process.env.HTTP_PORT);
        console.log('   | Database host: ' + process.env.DB_HOST);
        console.log('   | Database port: ' + process.env.DB_PORT);
    });
});

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = app;