var App = App || {};

require.config({
    paths: {
        Backbone : 'libs/backbone/backbone',
        Underscore : 'libs/underscore/underscore',
        jQuery : 'libs/jquery/dist/jquery',
        templates: '../templates',
        text : 'libs/text/text'
    },
    shim: {
        Backbone : ['Underscore','jQuery'],
        app : ['Backbone']
    }
});

require(['app'], function (app){ app.init()});

