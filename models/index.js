module.exports = function (postGre) {
    'use strict';
    this.User = require('./users')(postGre);
    this.Post = require('./posts')(postGre);
};