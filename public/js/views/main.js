define([
    'models/user',
    'views/navBar',
    'text!templates/main.html'
], function(
    ModelUser,
    ViewNavBar,
    TemplateMain
) {
    var MainView = Backbone.View.extend({
        el: '#content',
        template: _.template(TemplateMain),
        events: {
        },

        initialize: function(){
            var self = this;

            this.model = new ModelUser();
            this.model.fetch({
                success: function (model, response) {
                    self.render();
                },
                error: function (model, xhr) {

                }
            });

            this.render();
        },

        render: function(){
            this.$el.html(this.template({model: this.model.toJSON()}));

            ViewNavBar();

            return this;
        }
    });

    return MainView;
});