define([], function() {
    var SignUpModel = Backbone.Model.extend({
        urlRoot: '/signUp'
    });

    return SignUpModel;
});
