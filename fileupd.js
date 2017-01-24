var express = require('express');
var multer = require('multer');
var app = express();
var port = 82;

app.set('port', port);

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads');
    },
    filename: function (request, file, callback) {
        console.log(file);
        callback(null, file.originalname)
    }
});
var upload = multer({storage: storage}).single('photo');

//Showing index1.html file on our homepage
app.get('/', function(resuest, response) {
    response.sendFile('/uploadfile.html');
});

//Posting the file upload
app.post('/upload', function(request, response) {
    upload(request, response, function(err) {
        if(err) {
            console.log('Error Occured');
            response.send(err)
            return;
        }
        console.log(request.file);
        response.end('Your File Uploaded');
        console.log('Photo Uploaded');
    })
});

var server = app.listen(port, function () {
    console.log('Listening on port ' + server.address().port)
});
