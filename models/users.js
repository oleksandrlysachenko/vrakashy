module.exports = function (postGre) {

    var UserModel = postGre.Model.extend({
        tableName: 'users',

        post_id: function () {
            return this.hasMany(postGre.Models.Post, 'author_id');
        }
    });

    return UserModel;
};