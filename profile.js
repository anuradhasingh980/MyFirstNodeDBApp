/**
 * Created by lenovo on 2/1/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Profile', new Schema({
    name : String,
    email : String,
    gender :String,
    dob : Date,
    stateid :[{type :Schema.Types.ObjectId,ref :"State"}],
    cityid : [{type :Schema.Types.ObjectId,ref :"City"}],
    profileimg : String,
    status : Boolean
}));