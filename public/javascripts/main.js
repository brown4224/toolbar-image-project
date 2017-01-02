$(function () {
    // Create the socket.io connection
    var $socket = io.connect();

    //Cache Dom Varialbles
    var $toolbar = $('#toolbar');
    var $toolbarText = $('#toolbar-text');
    var $toolbarButton = $('#toolbar-button');
    var $displayText = $('#display-text');

    var $imageZone = $('#image-zone');
    var $url = window.location.href;
    var $urlImages = $url + "images/";

    console.log('Start jquery');

    // Add function when button clicked
    // Will submit text box
    $toolbarButton.click(function () {
        $socket.emit('send message', $toolbarText.val());
        $toolbarText.val('');
    });

    // This message will recieve "data" as an object
    $socket.on('new message', function (data) {
        console.log('Success Client Recieved!!!!');
        $displayText.append(data + "<br/>");
    });

    // Get images and display
    // Request Images
    $socket.emit('request-images');

    //Recieve images
    $socket.on('image file path', function () {
        console.log("success, I recieved the correct message");
    });

    // Recieve images and display
    $socket.on('image-list', function (data) {
        data.forEach(function (imgpath) {
            var $imgName = imgpath.replace(".*/", "");
            var $image = '<img src= "' + $urlImages + $imgName +  '" class= "media-object"> ';
            // console.log("<img src= \"" + $urlImages + $imgName + "\"> ");
            console.log($image);
            $imageZone.append($image);
            $displayText.css('position', 'absolute');

        });
    });
});
