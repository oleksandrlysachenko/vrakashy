var CONST = require('../../constants');
var USERS = require('../testHelpers/usersTemplate');
var mongoose = require('mongoose');
var request = require('supertest');
var models = require('../../models');

PreparingDB = function (){
    'use strict';

   //mongoose.connect(process.env.DB_HOST, process.env.DB_NAME, process.env.DB_PORT);
    var User = mongoose.model(CONST.MODELS.USER, mongoose.schemas.User);

    this.dropCollection = function (collection) {
        return function (callback) {
            mongoose.connection.on('open', function(){
                mongoose.connection.db.dropCollection(collection, function (err) {
                    if (err) {
                        return callback (err);
                    }

                    callback();
                });
            });
        };
    };

};
module.exports = PreparingDB;

