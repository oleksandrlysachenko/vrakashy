'use strict';

var request = require('supertest');
var expect = require('chai').expect;
var CONST = require('../../constants/index');
var USERS = require('../testHelpers/usersTemplate');
var async = require ('async');
var PreparingDB = require('./preparingDatabase');

var app = require('../../app');

describe('User Sign Up | Sing In | Sign Out', function () {
    this.timeout(10000);

    var agent = request.agent(app);
    var userData = USERS.TEMP_USER;
    var userLogin = USERS.TEMP_LOGIN_USER;

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

    it('User Sign Up', function (done) {

        agent
            .post('/signUp')
            .send(userData)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err)
                }

                expect(res.body).to.have.property('success');
                expect(res.body.success).to.equal('Login successful');

                done();
            });
    });

    it('User Sign Up with WRONG data', function (done) {

        userData.confirmPassword = '54321';

        agent
            .post('/signUp')
            .send(userData)
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    return done(err)
                }

                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Password is not confirm.');

                done();
            });
    });

    it('User Sign In', function (done) {

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

    it('User Sign In with WRONG data', function (done) {

        userLogin.confirmPassword = '54321';

        agent
            .post('/signIn')
            .send(userLogin)
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Password is not confirm.');

                done();
            });
    });

    it('User Sign Out', function (done) {

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