/* 
 * Created by: Nick Lowman
 * Last edited: 26/10/2010
 */


/*
 * @param {Object} $ - jQuery object
 * @param {Object} options - configuration options
 *
 * Resizes the child iFrame so it fit's inside it's parent iFrame. Otherwise it default to a min size.
 * Try disabling the load and resize events below to see the default behaviour.
 */
function configureIFrame($, options){
    var $parentiFrame = $(parent.document.getElementById(options.iFrameParentId)), //id of the parent iFrame
 $iFrame = $(document.getElementById(options.iFrameChildId)), $header = $(document.getElementById(options.headerId)), $navigation = $(document.getElementById(options.navigationId)), $close = $(document.getElementById(options.closeButtonId));
    
    $iFrame.bind({
        'load': function(){
            $iFrame.height(($parentiFrame.height() - $header.outerHeight()) + 'px');
        }
    });
    
    $(window).bind({
        'resize': function(){
            $iFrame.height(($parentiFrame.height() - $header.outerHeight()) + 'px');
        }
    });
    
    $close.closest('a').bind('click', function(evt){
        //Trigger the 'REMOVE' event on the jQuery object which belongs to the main window object
        //The REMOVE event removes the iframes and divs but not the javascript
        window.parent.jQuery.event.trigger('REMOVE');
        $.event.trigger('REMOVE');
        evt.preventDefault();
    });
    
    $navigation.bind({
        'click': function(evt){
           $link = $(evt.target).closest('a');
            if ($link.length) {
                $navigation.find('.active').removeClass('active');
                $link.addClass('active');
                $iFrame.attr('src', $link.attr('href'));
            }
            evt.preventDefault();
        }
    });
    
    //init function
    (function(){
        //add active class navigation item which matches the src of the iFrame
        var src = $iFrame.attr('src');
        $navigation.find('a').each(function(){
            $(this).attr('href') === src && $(this).addClass('active');
        });
    })();
}
