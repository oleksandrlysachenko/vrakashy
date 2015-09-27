module.exports = function (postGre) {

    var PostModel = postGre.Model.extend({
        tableName: 'posts',

        author_id: function () {
            return this.belongsTo(postGre.Models.User, 'author_id');
        }
    });

    return PostModel;
};