var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Add scoket.io variables
var sockIO = require('socket.io')();
app.sockIO = sockIO;

// Add file system
var fs = require('fs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


// app.get('/images', function (req, res) {
//     // res.send('SUCESS');
//     console.log('starting server process');
//
//     //This gives a path to the directory on server
//     // 'fs.readdir' process the directory
//     var imgPath = path.join(__dirname + '/public/images');
//     fs.readdir(imgPath, function (err, files) {
//         files.forEach(function (file) {
//             if (file.indexOf('.jpg') != -1) {
//                 console.log(file);
//             }
//         });
//     });
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// var imgData = [];
// var imgPath = path.join(__dirname + '/public/images');
// Chat application for socket.io
sockIO.on('connection', function (socket) {
    console.log('A client connection occured!!!');

    // Send the chat data to server
    socket.on('send message', function (data) {
        sockIO.emit('new message', data);
    });

// Create local variable with all images
    socket.on('request-images', function() {
        var imgData = [];
        var imgPath = path.join(__dirname + '/public/images');

        // Parse Directory
        fs.readdir(imgPath, function (err, files) {
            files.forEach(function (fileName) {
                if (fileName.indexOf('.jpg') != -1) {
                    imgData.push(fileName);
                }
            });
            sockIO.emit('image-list', imgData);
        });

    });

});


module.exports = app;
