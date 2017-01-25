
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var multer  = require('multer')
var morgan = require('morgan');
var Product = require('./models/product');
var Category = require('./models/category');
var bodyParser = require('body-parser');
var path = require('path');
mongoose.connect('mongodb://localhost:27017/mydb');     // connect to mongoDB database on modulus.io
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));

app.use('./public/core', express.static(__dirname + './public/core'));
app.use('./public/app', express.static(__dirname + './public/app'));
// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var server = app.listen(81, function () {

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
    Product.find(function(err, data) {
        if (err)
            res.send(err)
      res.json(data);
    });
});
var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads');
    },
    filename: function (request, file, callback) {
        console.log(file);
        var filename = file.originalname;
        request.body.prodimg = filename;
        callback(null,file.originalname)
    }
});
var upload = multer({storage: storage}).any();
app.post('/api/products',upload,function(req, res) {

    Product.create({
        prodid : req.body.prodid,
        prodname : req.body.prodname,
        prodprice:req.body.prodprice,
        prodqty : req.body.prodqty,
        prodcolor : req.body.prodcolor,
        prodimg : req.body.prodimg,
        category : req.body.category,

    }, function(err) {
        if (err)
            res.send(err);
        Product.find(function(err, products) {
            if (err)
                res.send(err)
            res.json(products);


        });
    });

});
app.delete('/api/categories/:cate_id',function (req, res) {

    Category.remove({_id: req.params.cate_id}, function (err, data) {
        if (err)
            res.send(err)
        else
            res.json(data)
    })

})
app.delete('/api/products/:prod_id', function(req, res) {
    Product.remove({
        _id : req.params.prod_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Product.find(function(err, prod) {
            if (err)
                res.send(err)
            res.json(prod);
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