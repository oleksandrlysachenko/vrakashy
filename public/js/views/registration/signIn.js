define([
    'models/signIn',
    'text!templates/registration/signIn.html'
],function(
    ModelSignIn,
    TemplateSignIn
){
    var ViewSignIn = Backbone.View.extend({
        el: '#mainContent',
        template: _.template(TemplateSignIn),
        events: {
            'click #signInBtn' : 'signIn',
            'click #signUpBtn' : 'signUp'
        },

        initialize: function(){
            this.render();
        },

        signIn: function (e) {
            var self = this;
            var thisEl = this.$el;
            var login = thisEl.find('#login').val();
            var password = thisEl.find('#password').val();
            var confirmPassword = thisEl.find('#confirmPassword').val();
            var user = new ModelSignIn();

            var data = {
                login: login,
                password: password,
                confirmPassword: confirmPassword
            };

            user.save(data, {
                success: function (model, res) {
                    alert(res.success);

                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#main', {trigger: true});
                },
                error: function (model, xhr) {
                    alert(xhr.responseJSON.error);
                }
            });
        },

        signUp: function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            Backbone.history.fragment = '';
            Backbone.history.navigate('#signUp', {trigger: true});
        },

        render: function(){
            this.$el.html(this.template());

            return this;
        }
    });

    return ViewSignIn;
});

