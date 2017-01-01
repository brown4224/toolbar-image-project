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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// var imageList = {};
// function readImageFiles(dirname) {
//     fs.readdir(dirname, function (dirname, filenames) {
//         // if(err){
//         //     onError(err);
//         //     return;
//         // }
//         filenames.forEach(function (filename) {
//           console.log(filename);
//             // imageList[i] = filename;
//         })
//     });
// }

app.get('/images', function (req, res) {
    // res.send('SUCESS');
    console.log('starting server process');
    fs.readdir(path.join(__dirname + '/public/images').toString(), function(err, files) {
        files.forEach(function (file) {
            console.log(file);
            // if (file.indexOf('.jpg') != -1) {
            //     console.log(file);
            // }
        });
    });


    // fs.pathname('/images').forEach(function (i,filename) {
    //     console.log(filename)
    // });

    // var normalizedPath = require("path").join(__dirname, "routes");


    // fs.readdirSync(normalizedPath).forEach(function(file) {
    //     require("./routes/" + file);
    // });



});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Chat application for socket.io
sockIO.on('connection', function (socket) {
  console.log('A client connection occured!!!');
  socket.on('send message', function(data){
    console.log('Message recieved by server');
    sockIO.emit('new message', data);
    console.log('Message sent by server');
    });
});



// function request(request, response) {
//     var store = '';
//
//     request.on('data', function(data)
//     {
//         store += data;
//     });
//     request.on('end', function()
//     {  console.log(store);
//         response.setHeader("Content-Type", "text/json");
//         response.setHeader("Access-Control-Allow-Origin", "*");
//         response.end(store)
//     });
// }



// // Sort through image folder
// function readImageFiles(dirname, onFileContent, onError) {
//   fs.readdir(dirname, function(err, filenames){
//     if(err){
//       onError(err);
//       return;
//       }
//       filenames.forEach(function (filename) {
//         fs.readFile(dirname + filename, 'utf-8', function(err, content){
//           if(err){
//             onError(err);
//             return;
//           }
//           onFileContent(filename,content);
//         })
//
//       });
//
//   });
//


module.exports = app;
