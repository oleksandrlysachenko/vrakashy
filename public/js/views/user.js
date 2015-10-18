define([
    'models/user',
    'text!templates/user.html'
], function(User, userTemplate){
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(userTemplate),

        events: {
            'click #backBtn' : 'back',
            'click #deleteBtn' : 'delete',
            'click #addPost' : 'addPost'
        },

        initialize: function(optins){
            this.render(optins);
        },

        back: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#users', {trigger: true});
        },

        addPost: function(e){

        },

        delete: function(e){
            var targetEl = $(e.target);
            var tr = targetEl.closest('div');
            var id = tr.attr('id');
            var user = new User({_id:id});

            user.destroy({
                success: function(){
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#users', {trigger: true});
                },
                error: function(){
                    alert('error');
                }});
            return
        },

        render: function(model){
            this.$el.html(this.template(model));
            return this;
        }
    });

    return View;
});
