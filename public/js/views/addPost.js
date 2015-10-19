define([
    'models/post',
    'text!templates/addPost.html'
], function(PostModel,createPostTemplate){
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(createPostTemplate),
        events: {
            'click #addPostBtn' : 'addPost'
        },
        initialize: function(optins){
            this.render(optins);
        },

        addPost: function(e){
            var self = this;
            var thisEl = this.$el;

            var targetEl = $(e.target);
            var element = targetEl.closest('div');
            var id = element.attr('id');

            var data = {};
            var description = thisEl.find('#description').val();
            var tags = thisEl.find('#tags').val();
            var content = thisEl.find('#content').val();
            var author = id;
            data = {
                description: description,
                tags: tags,
                content: content ,
                author: author
            };
            var Post = new PostModel(data);
            Post.save({}, {
                success: function(model){
                    self.undelegateEvents();
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#posts', {trigger: true});
                },
                error: function(response, xhr){
                    alert(response.status);
                }
            });
        },

        render: function(optins){
            this.$el.html(this.template);
            $('.form_addPost').attr('id',optins);
            return this;
        }
    });
    return View;
});