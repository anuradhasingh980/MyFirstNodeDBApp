/**
 * Created by lenovo on 1/17/2017.
 */
var mysql = require("mysql");
var settings = require("../settings");


exports.executeSql = function (sql, callback) {
    var connect = mysql.createConnection(settings.dbConfig);
    connect.connect(function (err) {
        if (!err) {
            connect.query(sql, function (err, data) {
                if (!err) {
                    connect.end();
                    callback(null, data);
                }
                else {
                    connect.end();
                    console.log(err);
                    err.status = 500;
                    callback(err, null);
                }
            });
        }
        else {
            connect.end();
            console.log(err);
            err.status = 500;
        }
    });
};

exports.executeStoredProcedure = function (storedProcedureName,parameter, callback) {
    var conn = new mysql.createConnection(settings.dbConfig);
    conn.connect().then(function () {

       // var req=new sqlDb.Request(conn)

        var req = new sqlDb.Request(conn);
        for (var key in parameter) {
            if (parameter.hasOwnProperty(key)) { // this will check if key is owned by data object and not by any of it's ancestors
                req.input(key, parameter[key]);

            }
        }

        req.execute(storedProcedureName).then(function (recordset) {
            conn.close();
            callback(recordset);
            return
        }).catch(function (err) {
            console.log(err);
            err.status = 500;
            callback(null, err);
        });
    }).catch(function (err) {
        console.log(err);
        err.status = 500;
        callback(null, err);
    });
};



