var CONST = require('../constants');

module.exports = function () {
    'use strict';
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var ObjectId = mongoose.Schema.ObjectId;
    var userSchema = new Schema({
        login: { type: String, unique: true },
        password: String,
        profile: {
            first: { type: String, default: 'First' },
            last: { type: String, default: 'Last' },
            dateOfBirth: { type: Date, default: null },
            email: { type: String, default: null }
        },
        //options: {},
        friends: [{ type: ObjectId, ref: CONST.MODELS.USER, default: null }],
        posts: [{ type: ObjectId, ref: CONST.MODELS.POST, default: null }]
        //userStatus: {type: String, default: 'User'}
    }, { collection: CONST.MODELS.USER + 's' });

    mongoose.schemas.User = userSchema;
};
