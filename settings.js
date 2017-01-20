/**
 * Created by lenovo on 1/17/2017.
 */
var path = require('path');

    exports.dbConfig = {
    user: "root",
    password: "",
    server: "localhost:8080/",
    database: "nodedemo"
};

exports.smtpConfig = {
    host: 'smtp.mandrillapp.com',
    port: 587,
    auth: {
        user: 'ajeet@lanetteam.com',
        pass: 'TkcN8G_ZxEYqWEdVVNuiUw'
    }
};

exports.apnConfig = {
    "gateway": "gateway.sandbox.push.apple.com",
    "cert": __dirname + "/config/sandbox-ck.pem",
    "key": __dirname + "/config/sandbox-key.pem",
    "passphrase": "123456"
};

exports.gcmSenderKey = "AIzaSyD5u7eDqon2NtwBP7kVGIaj_gF8-dGsAjs";
exports.webPort = 1337;
exports.JWTPrivateKey = "1234";
exports.expiresIn = 86400;//in seconds

