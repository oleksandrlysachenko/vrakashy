var Models = function() {
    'use strict';

    var mongoose = require('mongoose');
    mongoose.schemas = {};

    require('./users')();
    require('./posts')();
};
module.exports = Models();