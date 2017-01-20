/**
 * Created by lenovo on 1/17/2017.
 */
var db = require("../core/db");



exports.registerStudent = function (studnmae, email, address,callback) {
    var saltKey = '';
    db.executeStoredProcedure('registerStudent', { "name": studnmae, "email": email, "address":address,"saltKey":saltKey}, function (data, err) {
        if (err)
        {
            callback(err, null);
        }
            else
                {
                callback(null, data);
            }

    });
};
exports.getStudentProfile = function (callback) {
    db.executeSql("SELECT * FROM studdent ", function (data, err) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(data, null);
        }
    });
};


exports.updateStudent = function (name,email,address,id,callback) {
    // var updateQuery = "update studdent set name='" + name + "',email='" + email + "',address='" + address + "' where id='" + id + "'"

    console.log('------', "update studdent set name='" + name + "',email='" + email + "',address='" + address + "' where id='" + id + "'");
    db.executeSql("update studdent set name='" + name + "',email='" + email + "',address='" + address + "' where id='" + id + "'", function (err, data) {
        if (err) {
            callback (err, null);
            // return res.send({error: err});
        }
        else {
            callback(null, data);

            //return res.send({data: data});
        }
    })

};
exports.insertStudent = function (id,name,email,address,callback) {
    // var updateQuery = "update studdent set name='" + name + "',email='" + email + "',address='" + address + "' where id='" + id + "'"


    console.log('------', '"+ email +"');

    db.executeSql("insert into studdent values('"+id+"','"+name+"','"+email+"','"+address+"')", function (err, data) {
        if (err) {
            callback (err, null);
            // return res.send({error: err});
        }
        else {
            callback(null, data);

            //return res.send({data: data});
        }
    })

};
exports.deleteStudent = function (id,callback) {
    // var updateQuery = "update studdent set name='" + name + "',email='" + email + "',address='" + address + "' where id='" + id + "'"


    db.executeSql("delete from studdent  where id='" + id + "'", function (err, data) {
        if (err) {
            callback (err, null);
            // return res.send({error: err});
        }
        else {
            callback(null, data);

            //return res.send({data: data});
        }
    })

};




