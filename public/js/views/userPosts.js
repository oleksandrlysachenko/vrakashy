define([
    'models/post',
    'text!templates/userPosts.html'
], function(Post, postsTemplate){
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(postsTemplate),

        events: {
            'click #backToUserBtn' : 'backToUserBtn',
            'click .currentPost' : 'd'
        },

        initialize: function(optins){
            this.render(optins);
        },

        d: function(e){
            var targetEl = $(e.target);
            var tr = targetEl.closest('.currentPost');
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
                    alert('error :(');
                }
            });
        },

        backToUserBtn: function(e){
            var targetEl = $(e.target);
            var element = targetEl.closest('.currentUser');
            var id = element.attr('id');
            var url = '#user/' + id;
            Backbone.history.fragment = '';
            Backbone.history.navigate(url, {trigger: true});
        },

        render: function(optins){
            var collection = optins.collection.toJSON();
            this.$el.html(this.template({posts: collection}));
            console.log(optins);
            var id = optins.id;
            $('.currentUser').attr('id',id);
            return this;
        }
    });

    return View;
});
