define([
    'models/signUp',
    'text!templates/registration/signUp.html'
],function(
    SignUpModel,
    SignUpTemplates
){
    var SignUpView = Backbone.View.extend({
        el: '#content',
        template: _.template(SignUpTemplates),
        events: {
            'click #signUpBtn' : 'signUp'
        },

        initialize: function(){
            this.render();
        },

        signUp: function (e) {
            var thisEl = this.$el;
            var user = new SignUpModel();
            var data = {
                login: thisEl.find('#login').val(),
                password: thisEl.find('#password').val(),
                confirmPassword: thisEl.find('#confirmPassword').val(),
                profile: {
                    login: thisEl.find('#login').val(),
                    email: thisEl.find('#email').val(),
                    first: thisEl.find('#first').val(),
                    last: thisEl.find('#last').val()
                }
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

        readAttributes: function(thisEl) {
            var data = {};
            var readItems = ['#login', '#password', '#confirmPassword', '#email', '#first', '#last'];

            for (var i = readItems.length-1; i >= 0; i--) {
                data[readItems[i]] = thisEl.find(readItems[i]).val();
            }

            return data;
        },

        render: function(){
            this.$el.html(this.template());

            return this;
        }
    });

    return SignUpView;
});