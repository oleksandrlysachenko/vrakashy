define([
    'models/post',
    'text!templates/posts.html'
], function(Post, postsTemplate){
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(postsTemplate),

        events: {
            'click #userListBtn' : 'usersList',
            'click .currentPost' : 'd'
        },

        initialize: function(optins){
            this.render(optins);
        },

        d: function(e){
                var targetEl = $(e.target);
                var tr = targetEl.closest('tr');
                var id = tr.attr('id');
                console.log(id);
            var post = new Post({_id :id});
            post.fetch({
                success: function(model){
                    var url = model.urlRoot()+'/'+ model.id;
                    model = model.toJSON();
                    Backbone.history.fragment = '';
                    Backbone.history.navigate(url, {trigger: true});
                },
                error: function(){
                    alert('error users tech');
                }
            });
        },

        usersList: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#users', {trigger: true});
        },

        render: function(optins){
            var collection = optins.collection.toJSON();
            console.log(collection);
            this.$el.html(this.template({posts: collection}));
            return this;
        }
    });

    return View;
});