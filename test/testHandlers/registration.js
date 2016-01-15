'use strict';

var request = require('supertest');
var expect = require('chai').expect;
var CONST = require('../../constants/index');
var USERS = require('../testHelpers/usersTemplate');
var async = require ('async');
var PreparingDB = require('./preparingDatabase');

var app = require('../../app');

describe('Registration | Notification', function () {
    this.timeout(10000);

    var agent = request.agent(app);
    var userData = USERS.CUSTOM_USER;
    var userLogin = USERS.CUSTOM_LOGIN_USER;
    var verifyCode = 'abcd1234';


    before(function (done) {
        this.timeout(40000);
        console.log('>>> before');

        var preparingDB = new PreparingDB();

        async.series([
                preparingDB.dropCollection(CONST.MODELS.USER + 's')
            ], function (err, results) {
                if (err) {
                    return done(err)
                }

                done();
            });
    });

    it('User sign up', function (done) {

        userData.profile.email = 'death.moroz.dma@gmail.com';

        agent
            .post('/signUp')
            .send(userData)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err)
                }

                expect(res.body).to.have.property('success');
                expect(res.body.success).to.equal('Registration is success. Please, check your mail and verify your registration!');
                userData.id = res.body.id;

                done();
            });
    });

    it('User sign up with used login | MAKE error', function (done) {

        agent
            .post('/signUp')
            .send(userData)
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    return done(err)
                }

                console.log(res.body);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Login is used');

                done();
            });
    });

    it('User sign up with incorrect confirm password | MAKE error', function (done) {

        userData.confirmPassword = '54321';

        agent
            .post('/signUp')
            .send(userData)
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    return done(err)
                }

                console.log(res.body);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Password is not confirm.');
                //revert to original value
                userData.confirmPassword = '12345';

                done();
            });
    });

    it('User sign in without verification | MAKE error', function (done) {

        agent
            .post('/signIn')
            .send(userLogin)
            .expect(401)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                console.log(res.body);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Registration not verify! Please verify your registration with received link by email.');

                done();
            });
    });

    it('User sign in with wrong data | MAKE error', function (done) {

        userLogin.confirmPassword = '54321';

        agent
            .post('/signIn')
            .send(userLogin)
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                console.log(res.body);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Password is not confirm.');
                //revert to original value
                userLogin.confirmPassword = '12345';

                done();
            });
    });

    it('User sign in after verification', function (done) {


        agent
            .post('/verification?id=' + userData.id + '&code=' + verifyCode)
            .send()
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                expect(res.body).to.have.property('success');
                expect(res.body.success).to.equal('Verification is completed');

                agent
                    .post('/signIn')
                    .send(userLogin)
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

    it('User sign out', function (done) {

        agent
            .post('/signOut')
            .send(userLogin)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                expect(res.body).to.have.property('success');
                expect(res.body.success).to.equal('Logout successful');

                done();
            });

    });

});