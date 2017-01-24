/**
 * Created by lenovo on 1/23/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var prodschema =new Schema({



    prodid:Number,
    prodname : String,
    prodprice : Number,
    prodqty : Number,
    prodcolor :String,
    prodimg : String,
    category : [{type :Schema.Types.ObjectId,ref :"Category"}]


})
module.exports = mongoose.model('Product',prodschema);

