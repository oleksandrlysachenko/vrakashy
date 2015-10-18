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
            Backbone.history.navigate('#users', {trigger: true});
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

/* define([
    'models/session',
    'text!templates/singUp.html'
], function(session,singUpTemplate){
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(singUpTemplate),
        events: {
            'click #loginBtn': 'login'
        },
        initialize: function(){
            this.render();

        },
        login: function(e){
            var self = this;
            var thisEl = this.$el;
            var user = thisEl.find('#user').val();
            var password = thisEl.find('#password').val();
            var data = {
                user: user,
                password: password
            };
            var ses = new session(data);
            console.log('data: '+JSON.stringify(data));
            console.log('ses: '+JSON.stringify(ses));
            ses.save({},{
                success: function(model) {
                    console.log('model-return: '+JSON.stringify(model));
                    model = model.toJSON();
                    var url = 'user'+'/'+model._id;
                    Backbone.history.fragment = '';
                    Backbone.history.navigate(url, {trigger: true});
                },
                error: function(err){
                    console.log(err);
                    alert('not find user');
                }
            });
        },
        render: function(model){
            this.$el.html(this.template());
            return this;
        }
    });
    console.log(View);
    return View;
}); */