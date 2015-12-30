module.exports = function(db) {
    'use strict';

    require('./users')(db);
    require('./posts')(db);
};
