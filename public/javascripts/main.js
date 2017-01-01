$(function(){
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
    $toolbarButton.click(function(){
        $socket.emit('send message', $toolbarText.val());
        $toolbarText.val('');

    });

    // This message will recieve "data" as an object
    $socket.on('new message', function(data){
        console.log('Success Client Recieved!!!!');
        $displayText.append(data + "<br/>");
    });


    // Get images and display
    var $imgFolder = '/images/';
    var $imgType = '.jpeg';
    var $imageZone = $('#image-zone');

    console.log('load ajax function');


    $.ajax({
        // type: 'GET',
        url: '/images',
        contentType: 'application/json',
        success: function (data) {
            console.log('Success!! Got an AJAX responce');
            console.log(data);
        }
    });

    // function processImage(imgFile){
    //     // if(!imgFile.contains($imgType))
    //     //     return;
    //
    //     // process image
    //     console.log('loading images');
    //     $imageZone.append("<img src = " + $imgFolder + imgFile);
    // }

    // $.ajax({
    //     url: $imgFolder,
    //     success: function (data) {
    //         $data.find(RegExp(".jpg")).each(function(img) {
    //             console.log(imag);
    //         });
    //     }
    // });
    // $.ajax({
    //     url: "/images/",
    //     success: function(data){
    //         $(data).find("a:contains(.jpg)").each(function(){
    //             // will loop through
    //             var images = $(this).attr("href");
    //             console.log(images);
    //             // $('<p></p>').html(images).appendTo('a div of your choice')
    //
    //         });
    //     }
    // });

});
