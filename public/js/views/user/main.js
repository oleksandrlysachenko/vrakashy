define([
    'models/user',
    'text!templates/user/main.html'
], function(
    UserModel,
    Template
) {
    var MainUserView = Backbone.View.extend({
        el: '#content',
        template: _.template(Template),
        events: {
        },

        initialize: function(){
            console.log('Initialize: MainUser View');

            var self = this;

            this.model = new UserModel();
            this.model.fetch({
                success: function (model, response) {
                    self.render();
                },
                error: function (model, xhr) {
                    alert(xhr.responseJSON.error);
                }
            });
        },

        render: function(){
            console.log('Render: MainUser View');

            this.$el.html(this.template({model: this.model.toJSON()}));

            return this;
        }
    });

    return MainUserView;
});