define([], function() {
    var SignInModel = Backbone.Model.extend({
        urlRoot: '/signIn'
    });

    return SignInModel;
});