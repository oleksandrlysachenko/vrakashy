'use strict';

var request = require('supertest');
var expect = require('chai').expect;
var CONST = require('../../constants/index');
var USERS = require('../testHelpers/usersTemplate');
var async = require ('async');
var PreparingDB = require('./preparingDatabase');

var app = require('../../app');

describe('User functionality', function () {
    this.timeout(10000);

    var agent = request.agent(app);
    var loginData = USERS.TEMP_USER;

    before(function (done) {
        this.timeout(40000);
        console.log('>>> before');

        var preparingDB = new PreparingDB();

        async.series([
            preparingDB.dropCollection(CONST.MODELS.USER + 's'),
            preparingDB.createUserByTemplate()
        ], function (err, results) {
            if (err) {
                return done(err)
            }

            done();
        });
    });

    it('User GET his profile', function (done) {

        agent
            .post('/signIn')
            .send(loginData)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err)
                }

                expect(res.body).to.have.property('success');
                expect(res.body.success).to.equal('Login successful');

                agent
                    .get('/user')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }

                        console.log(res.body);
                        expect(res.body).to.have.property('_id');
                        expect(res.body).to.have.property('profile');

                        done();
                    });
            });
    });

});