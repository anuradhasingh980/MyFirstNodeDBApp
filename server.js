/**
 * Created by lenovo on 1/23/2017.
 */
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var Product = require('./models/product');
var Category = require('./models/category');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/mydb');     // connect to mongoDB database on modulus.io
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


// parse application/vnd.api+json as json

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});



var server = app.listen(63342, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});
app.get('/api/categories', function(req, res) {

    // use mongoose to get all todos in the database
    Category.find(function(err,categories) {
        if (err)
            res.send(err)

        res.json(categories);
    });
});

app.get('/api/products', function(req, res) {

    // use mongoose to get all todos in the database
    Product.find(function(err, products) {
        if (err)
            res.send(err)

        res.json(products);
    });
});

app.post('/api/products', function(req, res) {

    Product.create({
        prodid : req.body.prodid,
        prodname : req.body.prodname,
        prodprice:req.body.prodprice,
        prodqty : req.body.prodqty,
        prodcolor : req.body.prodcolor,
        category : req.body.category

    }, function(err) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Product.find(function(err, products) {
            if (err)
                res.send(err)
            res.json(products);
        });
    });

});

app.post('/api/categories', function(req, res) {

    Category.create({
        cateid : req.body.cateid,
        catename : req.body.catename

    }, function(err) {
        if (err)
            res.send(err);

        Category.find(function(err, categories) {
            if (err)
                res.send(err)
            res.json(categories);
        });
    });

});



app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});






