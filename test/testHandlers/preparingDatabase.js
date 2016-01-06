var CONST = require('../../constants');
var USERS = require('../testHelpers/usersTemplate');
var mongoose = require('mongoose');
var request = require('supertest');
var models = require('../../models');

PreparingDB = function (){
    'use strict';

    var User = mongoose.model(CONST.MODELS.USER, mongoose.schemas.User);

    this.dropCollection = function (collection) {
        return function (callback) {
            mongoose.connection.on('open', function() {
                mongoose.connection.db.dropCollection(collection, function (err) {
                    if (err) {
                        return callback (err);
                    }

                    console.log('Drop collection ' + collection);

                    callback();
                });
            });
        };
    };

    this.createUserByTemplate = function (count) {
        return function (callback) {

            for (var i = 0; count > i; i++) {
                USERS.TEMP_USER.login = 'temp' + i;
                var user = new User(USERS.TEMP_USER);
                user.save(function (err, model) {
                    if (err) {
                        return callback(err);
                    }
                });
            }

            callback();
        };
    };

};
module.exports = PreparingDB;

