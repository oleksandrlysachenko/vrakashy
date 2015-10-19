var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = Schema({
    //_id : Number,
    description: String,
    tags : [{type: String}],
    content : String,
    //author : ObjectId,
    author : {type: String, ref: 'user'},
    createDate : {type : Date, default : Date.now}
}, {collection : 'Post'});

mongoose.schemas.Post = PostSchema;