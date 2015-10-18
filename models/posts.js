var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = Schema({
    //_id : Number,
    description: String,
    tags : [{type: String}],
    content : String,
    _author : {type: Number, ref: 'user'},
    createDate : {type : Date, default : Date.now}
}, {collection : 'Post'});

mongoose.schemas.Post = PostSchema;