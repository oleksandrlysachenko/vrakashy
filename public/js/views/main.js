define([
    'text!templates/main.html'
], function(mainTemplate){
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(mainTemplate),
        events: {
            'click #loginBtn': 'login',
            'click #singUpBtn': 'singUp',
            'click #usersBtn' : 'users',
            'click #postsBtn' : 'posts'
        },

        users: function() {
            Backbone.history.fragment = '';
            Backbone.history.navigate('#users', {trigger: true});
        },
        posts: function() {
            Backbone.history.fragment = '';
            Backbone.history.navigate('#posts', {trigger: true});
        },
        login: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#login', {trigger: true});
        },

        singUp: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#singUp', {trigger: true});
        },

        initialize: function(){
            this.render();

        },
        render: function(){
            this.$el.html(this.template());
            return this;
        }
    });
    return View;
});