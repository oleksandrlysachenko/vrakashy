module.exports = function() {
    'use strict';

    mongoose.schemas = {};

    require('./users');
    require('./session');
    require('./posts');
};
