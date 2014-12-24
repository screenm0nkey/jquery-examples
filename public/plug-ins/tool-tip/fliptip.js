/*
 * jQuery tooltips
 * Version 1.1  (April 6, 2010)
 * @requires jQuery v1.4.2+
 * @author Karl Swedberg
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
(function($){

    var $liveTip = $('<div id="livetip"></div>').hide().appendTo('body'), $win = $(window), showTip;
    
    var tip = {
        title: '',
        offset: 12,
        delay: 300,
        position: function(event){
            var positions = {
                x: event.pageX,
                y: event.pageY
            };
            var dimensions = {
                x: [$win.width(), $liveTip.outerWidth()],
                y: [$win.scrollTop() + $win.height(), $liveTip.outerHeight()]
            };
            
            for (var axis in dimensions) {
            
                if (dimensions[axis][0] < dimensions[axis][1] + positions[axis] + this.offset) {
                    positions[axis] -= dimensions[axis][1] + this.offset;
                }
                else {
                    positions[axis] += this.offset;
                }
                
            }
            
            $liveTip.css({
                top: positions.y,
                left: positions.x
            });
        }
    };
    
    $('#mytable').delegate('a', 'mouseover mouseout mousemove', function(event){
        var link = this, $link = $(this);
        
        if (event.type == 'mouseover') {
            tip.title = link.title;
            link.title = '';
            
            showTip = setTimeout(function(){
            
                $link.data('tipActive', true);
                
                tip.position(event);
                
                $liveTip.html('<div>' + tip.title + '</div><div>' + link.href + '</div>').fadeOut(0).fadeIn(200);
                
            }, tip.delay);
        }
        
        if (event.type == 'mouseout') {
            link.title = tip.title || link.title;
            if ($link.data('tipActive')) {
                $link.removeData('tipActive');
                $liveTip.hide();
            }
            else {
                clearTimeout(showTip);
            }
        }
        
        if (event.type == 'mousemove' && $link.data('tipActive')) {
            tip.position(event);
        }
        
    });
    
})(jQuery);
