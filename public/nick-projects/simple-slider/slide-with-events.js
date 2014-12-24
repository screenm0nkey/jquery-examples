
(function($, window, document, undefined){

    $.fn.simpleSlider = function(options){
        //if you don't supply the third empty object it will update the defaultOptions object as well as config
        var options = $.extend(true, {}, $.fn.simpleSlider.defaultOptions, options || {});
        
        return this.each(function(){
            var $this = $(this);
            var $sliderPanels = $this.children('.'+options.panelClass);
            var currPanel = 0;

            $(options.leftNav).click(function(){
                $this.trigger('MOVE-BACKWARDS');
            });
            $(options.rightNav).click(function(){
                $this.trigger('MOVE-FORWARDS');
            });
            
            
            $this.bind({
                'MOVE-BACKWARDS': function(){
                    currPanel--;
                    // check if the new panel value is too small
                    if (currPanel < 0) {
						currPanel = $sliderPanels.length - 1;
					}
                    
                    $this.trigger({
                        type: 'SLIDE-PANELS',
                        panel: currPanel,
                        slideIn: $(window).width() - $this.offset().left,
						slideOut: -1 * ($this.offset().left + $this.width())
                    });
                    return false;
                },
                'MOVE-FORWARDS': function(){
                    currPanel++;
                    
                    // check if the new panel value is too big
                    if (currPanel >= $sliderPanels.length) {
						currPanel = 0;
					}
                    
                    $this.trigger({
                        type: 'SLIDE-PANELS',
                        panel: currPanel,
						slideIn: -1 * ($this.offset().left + $this.width()),
						slideOut: $(window).width() - $this.offset().left
                    });
                    return false;
                },
                'SLIDE-PANELS': function(evt){
                    $sliderPanels.filter('.active').animate({
                        left: evt.slideOut
                    }, 500, function(){
                        $(this).removeClass('active');
                    });

					$($sliderPanels[evt.panel]).css('left',evt.slideIn).addClass('active').animate({
						left:0
					},500);

                    return false;
                }
            });
            
        });
    };
	
    $.fn.simpleSlider.defaultOptions = {
        leftNav: '#left',
        rightNav: '#right',
		panelClass: 'slider-panel'
    }
})(jQuery, this, this.document);
