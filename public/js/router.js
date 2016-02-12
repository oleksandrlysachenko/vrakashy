define([
    'Backbone',
    'views/registration/signIn',
    'views/registration/signUp',
    'views/main'
], function(
    Backbone,
    ViewSignIn,
    ViewSignUp,
    ViewMain
) {
    var Router = Backbone.Router.extend({

        contentView: null,

        routes: {
            "" : "toMain",
            "signIn" : "toSignIn",
            "signUp" : "toSignUp",
            "main" : "toMain",
            "*any" : "any"
        },

        initialize: function() {
        },

        toSignIn: function() {
            if (this.contentView) {
                this.contentView.undelegateEvents();
            }

            this.contentView = new ViewSignIn();
        },

        toSignUp: function() {
            if (this.contentView) {
                this.contentView.undelegateEvents();
            }

            this.contentView = new ViewSignUp();
        },

        toMain: function() {
            if (this.contentView) {
                this.contentView.undelegateEvents();
            }

            this.contentView = new ViewMain();
        },

        any: function(){
        }

    });

    return Router;
});