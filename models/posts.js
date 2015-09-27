module.exports = function (postGre) {

    var PostModel = postGre.Model.extend({
        tableName: 'posts'


    });

    return PostModel;
};