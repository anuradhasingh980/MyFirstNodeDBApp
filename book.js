/**
 * Created by lenovo on 1/20/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookschema = new Schema({
    bookname:  String,
    authr:[{ type:Schema.Types.ObjectId,ref:'Auther' }]
});

module.exports = mongoose.model('Book',bookschema);