var express = require('express');
var app = express();
var port = 3030;

var knex = require('knex')({
       debug: true,
       client: 'pg',
       connection: {
          host: 'localhost',
          user: 'postgres',
          password: '12345',
          port: 5432,
          database: 'test',
          charset  : 'utf8'
       }
    }
);

var PostGre = require('bookshelf')(knex);
app.set('PostGre', PostGre);

var Model = require('./models/index');
PostGre.Models = new Model(PostGre);

require('./routes')(app);

app.listen(port, function () {
   console.log("-> Server started on port: " + port);
});
