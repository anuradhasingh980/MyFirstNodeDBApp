/**
 * Created by lenovo on 1/23/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cateschema =new Schema({

    cateid : Number,
    catename : String,

})
module.exports = mongoose.model('Category',cateschema);

