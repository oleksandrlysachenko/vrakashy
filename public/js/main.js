require.config({
    paths: {
        Backbone : 'libs/backbone/backbone',
        Underscore : 'libs/underscore/underscore',
        jQuery : 'libs/jquery/dist/jquery',
        Bootstrap: 'libs/bootstrap/dist/js/bootstrap',
        templates: '../templates',
        text : 'libs/text/text'
    },
    shim: {
        Bootstrap: ['Bootstrap'],
        Backbone : ['Underscore','jQuery'],
        app : ['Backbone']
    }
});

require(['app'], function (app){
    app.init()
});

