var CONST = require('../constants');

module.exports = function (db) {
    'use strict';
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var ObjectId = mongoose.Schema.ObjectId;
    var userSchema = new Schema({
        email: { type: String, default: 'example@example.com' },
        password: String,
        profile: {
            first: { type: String, default: 'First' },
            last: { type: String, default: 'Last' },
            dateOfBirth: { type: Date },
            email: String
        },
        //options: {},
        //friends: [{type: Number, ref: 'user'}],
        posts: [{ type: ObjectId, ref: CONST.MODELS.POST, default: null }]
        //userStatus: {type: String, default: 'User'}
    }, { collection: CONST.MODELS.USER + 's' });

    db.model(CONST.MODELS.USER, userSchema);
};
