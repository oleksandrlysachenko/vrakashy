var CONST = require('../constants');

module.exports = function () {
    'use strict';
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var ObjectId = mongoose.Schema.ObjectId;
    var userSchema = new Schema({
        login: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        profile: {
            login: { type: String, required: true },
            first: { type: String, required: true },
            last: { type: String, required: true },
            dateOfBirth: { type: Date, default: null },
            email: { type: String, unique: true, required: true },
            location: { type: Object, default: null }
        },
        options: {
            verifyRegistration: { type: Boolean, default: false },
            verifyCode: { type: String, default: null }
        },
        friends: [{ type: ObjectId, ref: CONST.MODELS.USER, default: null }],
        posts: [{ type: ObjectId, ref: CONST.MODELS.POST, default: null }]
        //userStatus: {type: String, default: 'User'}
    }, { collection: CONST.MODELS.USER + 's' });

    mongoose.schemas.User = userSchema;
};
