/**
 * Created by lenovo on 1/20/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorschema = new Schema({
    authname:  String,
    book:[{ type:Schema.Types.ObjectId,ref:'Book' }]
});

module.exports = mongoose.model('Auther',authorschema);