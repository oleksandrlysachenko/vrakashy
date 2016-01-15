'use strict';

var request = require('supertest');
var expect = require('chai').expect;
var CONST = require('../../constants/index');
var USERS = require('../testHelpers/usersTemplate');
var async = require('async');
var PreparingDB = require('./preparingDatabase');

var app = require('../../app');

describe('Mailer functionality', function () {
    this.timeout(10000);

    var agent = request.agent(app);
    var loginData = USERS.TEMP_LOGIN_USER;
    // custom_user login data with real mail
    var customLoginData = USERS.CUSTOM_LOGIN_USER_NEW_PASS;
    // TODO enter email for invite
    var receiverEmail = {
        email: 'death.moroz.dma@gmail.com'
    };
    // TODO enter email to confirm register email and send a new generate password
    var confirmEmail = {
        email: 'death.moroz.dma@gmail.com'
    };

    before(function (done) {
        this.timeout(40000);
        console.log('>>> before');

        var preparingDB = new PreparingDB();

        async.series([
            preparingDB.dropCollection(CONST.MODELS.USER + 's'),
            preparingDB.createUserByTemplate(1),
            preparingDB.createCustomUserByTemplate(USERS.CUSTOM_USER)
        ], function (err, results) {
            if (err) {
                return done(err)
            }

            done();
        });
    });

    it('User SEND invite', function (done) {

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
                    .post('/mail/invite')
                    .send(receiverEmail)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }

                        expect(res.body).to.have.property('success');
                        expect(res.body.success).to.equal('Success');

                        done();
                    });
            });
    });

    it('User SEND forgot password', function (done) {

        agent
            .post('/mail/forgot')
            .send(confirmEmail)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                expect(res.body).to.have.property('success');
                expect(res.body.success).to.equal('Success');

                agent
                    .post('/signIn')
                    .send(customLoginData)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }

                        expect(res.body).to.have.property('success');
                        expect(res.body.success).to.equal('Login successful');

                        done();
                    });
            });
    });

})
;