define([
    'models/post',
    'text!templates/posts.html'
], function(Post, postsTemplate){
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(postsTemplate),

        events: {
        },

        initialize: function(optins){
            this.render(optins);
        },

        render: function(optins){
            var collection = optins.collection.toJSON();
            this.$el.html(this.template({posts: collection}));
            return this;
        }
    });

    return View;
});