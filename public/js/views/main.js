define([
    'models/user',
    'views/navBar',
    'views/user/main',
    'text!templates/main.html'
], function(
    UserModel,
    NavBar,
    MainUserView,
    TemplateMain
) {
    var MainView = Backbone.View.extend({
        el: '#mainContent',
        template: _.template(TemplateMain),
        events: {
        },

        initialize: function(){
            console.log('Initialize: main View');

            this.render();
        },

        render: function(){
            console.log('Render: main View');

            this.$el.html(this.template(/*{model: this.model.toJSON()}*/));

            this.navBar = new NavBar();
            this.mainUser = new MainUserView();

            return this;
        }
    });

    return MainView;
});