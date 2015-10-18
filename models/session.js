var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SessionSchema = Schema({

}, {collection: 'session', version: false});

mongoose.schemas.Session = SessionSchema;
