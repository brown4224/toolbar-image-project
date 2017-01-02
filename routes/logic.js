/**
 * Created by Sean on 1/2/2017.
 */
module.exports = {

socket:

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
}