/// <reference path="jquery-1.4.1-vsdoc2.js" />
/*----------------------------------------
Author:     	Nick Lowman
Author URI:     http://www.tui.co.uk/
Project:        Greater London Auhtority - Climate Site	
Notes: 			
----------------------------------------*/




$(function() {
    var $block39 = $('#block-039');
    var width = $block39.find('.top').width();
    //will hide the pop-up if user clicks anywhere outside of pop-up
    $(document).bind('mousedown', function() {
        $block39.hide();
    });

    //stops pop-up closing by preventing the event from bubbling up the DOM
    $block39.bind('mousedown', function(event) {
        event.stopPropagation();
    });

    $('#links').click(function(evt) {
    var $target = $(evt.target);
        var x = evt.pageX - (width / 2) + 'px';
        var y = evt.pageY - 150 + 'px';
        

        $block39.css({
            top: y,
            left: x
        }).fadeIn(200);

        return false;
    });
});
