define([
    'models/user',
    'text!templates/singUp.html'
], function(UserModel, userTemplate){
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(userTemplate),

        events: {
            'click #saveBtn': 'createUser',
            'click #backBtn': 'back'
        },

        initialize: function(){
            this.render();
        },

        back: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#login', {trigger: true});
        },

        createUser: function(e){
            var self = this;
            var thisEl = this.$el;
            var data = {};
            var user = thisEl.find('#user').val();
            var email = thisEl.find('#email').val();
            var password = thisEl.find('#password').val();
            var firstName = thisEl.find('#namefirst').val();
            var lastName = thisEl.find('#namelast').val();
            data = {
                user: user,
                password: password,
                email: email ,
                firstName: firstName,
                lastName: lastName
            };
            var User = new UserModel(data);
            User.save({}, {
                success: function(model){
                    self.undelegateEvents();
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#users', {trigger: true});
                },
                error: function(response, xhr){
                    alert(response.status);
                }
            });
        },

        render: function(){
            this.$el.html(this.template());

            return this;
        }
    });

    return View;
});
