/**
 * Created by lenovo on 1/17/2017.
 */
var express = require('express');
var router = express.Router();
var stud = require("../model/studtbl");

router.get('/Student/getStudentProfile', function (req, res, next) {
    //var session = res.locals.session;
    stud.getStudentProfile(function (err, data) {
        if (err) {
            return next(err);
        } else {
            res.send(200, data[0])
        }
    });
});