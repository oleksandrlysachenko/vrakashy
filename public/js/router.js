define([
    'Backbone',
    'views/registration/signIn',
    'views/registration/signUp',
    'views/registration/signOut',
    'views/main',
    'views/user/search'
], function(
    Backbone,
    SignInView,
    SignUpView,
    SignOutView,
    MainView,
    UserSearchView
) {
    var Router = Backbone.Router.extend({

        mainView: null,
        contentView: null,

        routes: {
            "" : "toMain",
            "signIn" : "toSignIn",
            "signUp" : "toSignUp",
            "signOut" : "toSignOut",
            "main" : "toMain",
            "user/search" : "toUserSearch",
            "*any" : "any"
        },

        initialize: function() {
        },

        toSignIn: function() {
            if (this.contentView) {
                this.contentView.undelegateEvents();
            }

            this.contentView = new SignInView();
        },

        toSignUp: function() {
            if (this.contentView) {
                this.contentView.undelegateEvents();
            }

            this.contentView = new SignUpView();
        },

        toSignOut: function() {
            if (this.contentView) {
                this.contentView.undelegateEvents();
            }

            this.contentView = new SignOutView();
        },

        toMain: function() {
            if (this.contentView) {
                this.contentView.undelegateEvents();
            }

            this.contentView = new MainView();
        },

        toUserSearch: function() {
            if (!this.mainView) {
                this.mainView = new MainView();
            }

            if (this.contentView) {
                this.contentView.undelegateEvents();
            }

            this.contentView = new UserSearchView();
        },

        any: function(){
        }

    });

    return Router;
});