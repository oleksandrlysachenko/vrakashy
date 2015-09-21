var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = Schema({
    _id: Number,
    email: String,
    password: String,
    nikName: String,
    name: {
        first: {type: String, default: 'Alex'},
        last: {type: String, default: 'Pupinus'}
    },
    dateOfBirth: {},
    age: {},
    friends: [{type: Number, ref: 'user'}],
    posts: [{type: Number, ref: 'post'}],
    userStatus: {type: String, default: 'User'}
}, {collection: 'User', version: false});

mongoose.schemas = {};
mongoose.schemas.User = UserSchema;
