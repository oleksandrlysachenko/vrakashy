define([
    'models/user',
    'text!templates/users.html'
], function(User, userTemplate){
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(userTemplate),

        events: {
        },

        initialize: function(optins){
            this.render(optins);
        },

        render: function(optins){
            var collection = optins.collection.toJSON();

            this.$el.html(this.template({users: collection}));

            return this;
        }
    });

    return View;
});