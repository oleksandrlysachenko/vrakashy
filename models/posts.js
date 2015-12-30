var CONST = require('../constants');

module.exports = function (db) {
    'use strict';
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var ObjectId = mongoose.Schema.ObjectId
    var postSchema = new Schema({
        title: String,
        description: String,
        tags: [{ type: String }],
        content: String,
        author: { type: ObjectId, ref: CONST.MODELS.USER, default: null },
        createAt: { type: Date, default: Date.now }
    }, { collection: CONST.MODELS.POST + 's' });

    db.model(CONST.MODELS.POST, postSchema);
};