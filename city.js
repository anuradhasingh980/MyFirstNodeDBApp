/**
 * Created by lenovo on 2/1/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('City', new Schema({
    cityname : String,
    stateid :[{type :Schema.Types.ObjectId,ref :"State"}]
}));