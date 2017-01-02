$(function () {
    // Create the socket.io connection
    var $socket = io.connect();

    //Cache Dom Varialbles
    var $toolbar = $('#toolbar');
    var $toolbarText = $('#toolbar-text');
    var $toolbarButton = $('#toolbar-button');
    var $displayText = $('#display-text');

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
    var $imgFolder = '/images/';
    var $imgType = '.jpeg';
    var $imageZone = $('#image-zone');

    console.log('load ajax function');

    $socket.emit('request-images');


    $socket.on('image file path', function () {
        console.log("success, I recieved the correct message");
    });

    $socket.on('image-list', function (data) {
        console.log('recieving data');
        console.log(data);
    });
});
