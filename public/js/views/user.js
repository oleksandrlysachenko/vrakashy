define([
    'models/user',
    'views/addPost',
    'text!templates/user.html'
], function(
    User,
    AddPostView,
    userTemplate ) {
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
            var self = this;
            var targetEl = $(e.target);
            var tr = targetEl.closest('div');
            var id = tr.attr('id');
                if (self.adView) {
                    self.adView.undelegateEvents();
                } else{
                self.adView = new AddPostView(id);
                return self; }

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
