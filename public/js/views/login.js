define([
    'models/session',
    'text!templates/login.html'
],function(
    ModelSession,
    TemplateLogin
){
    var ViewLogin = Backbone.View.extend({
        el: '#content',
        template: _.template(TemplateLogin),
        events: {
            'click #logBtn' : 'login'
        },

        login: function(){
            var thisEl = this.$el;
            var user = thisEl.find('#user').val();
            var password = thisEl.find('#password').val();
            var data = {
                user : user,
                password : password
            };
            var Session = new ModelSession(data);
            Session.url = 'session/login?user=' + data.user + '&password=' + data.password;
            Session.fetch({
                success: function(model,response){
                    var url = '#user/' + response._id;

                    Backbone.history.fragment = '';
                    Backbone.history.navigate(url, {trigger: true});
                },
                error: function(response,xhr){
                    alert('error');
                }
            })
        },

        initialize: function(optins){
            this.render(optins);
        },

        render: function(model){
            this.$el.html(this.template(model));
            return this;
        }
    });
    return ViewLogin
});
