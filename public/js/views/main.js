define([
    'text!templates/main.html'
], function(mainTemplate){
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(mainTemplate),
        events: {
            'click #usersBtn': 'usersBtn',
            'click #postsBtn': 'postsBtn'
        },

        usersBtn: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#users', {trigger: true});
        },

        postsBtn: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#posts', {trigger: true});
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