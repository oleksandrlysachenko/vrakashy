define([
    'collections/users',
    'text!templates/user/search.html'
], function(
    CollectionUser,
    Template
) {
    var UserSearchView = Backbone.View.extend({
        el: '#content',
        template: _.template(Template),
        events: {
            'click .trClicked' : 'selectRow'
        },

        initialize: function() {
            console.log('Initialize: user search View');

            var self = this;

            this.collection = new CollectionUser();
            this.collection.fetch({
                success: function (model, response) {
                    self.render();
                },
                error: function (model, xhr) {
                    alert(xhr.responseJSON.error);
                }
            });
        },

        selectRow: function (e) {
            var thisE = $(e.currentTarget);
            var id = thisE.attr('data-hash');
            var selectedItem = this.collection.toJSON()[id];

            //var id = thisEl.currentTarget.attr('data-hash');
            thisE.parent().children().removeClass('rowSelected');
            thisE.addClass('rowSelected');

            console.log('id: ' + id + ', selectItem: ' + selectedItem);
        },

        render: function() {
            console.log('Render: user search View');

            this.$el.html(this.template({collection: this.collection.toJSON()}));

            return this;
        }
    });

    return UserSearchView;
});