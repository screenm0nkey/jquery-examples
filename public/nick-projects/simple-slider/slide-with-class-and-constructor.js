
(function($, window, document, undefined){

    var SimpleSlider = function(elm, options){
        var base = this, 
			opts, 
			$sliderPanels;
        
		//if you don't supply the third empty object it will update the defaultOptions object as well as config
        base.options = $.extend(true, {}, SimpleSlider.defaultOptions, options || {});
        base.$elm = $(elm);
        base.elm = elm;
        base.$elm.data("slider", base);
        
        //slide items to the left
        base.moveBackwards = function(){
            opts.currPanel--;
            
            // check if the new panel value is too small
            if (opts.currPanel < 0) {
                opts.currPanel = $sliderPanels.length - 1;
            }
            
            base.slidePanels({
                slideIn: $(window).width() - base.$elm.offset().left,
                slideOut: -1 * (base.$elm.offset().left + base.$elm.width())
            });
            return false;
        };
        
        //slide items to the right
        base.moveForwards = function(){
            opts.currPanel++;
            
            // check if the new panel value is too big
            if (opts.currPanel >= $sliderPanels.length) {
                opts.currPanel = 0;
            }
            
            base.slidePanels({
                slideIn: -1 * (base.$elm.offset().left + base.$elm.width()),
                slideOut: $(window).width() - base.$elm.offset().left
            });
            return false;
        };
        
        base.slidePanels = function(evt){
            $sliderPanels.filter('.active').animate({
                left: evt.slideOut
            }, 500, function(){
                $(this).removeClass('active');
            });
            
            $($sliderPanels[opts.currPanel]).css('left', evt.slideIn).addClass('active').animate({
                left: 0
            }, 500)
            
            return false;
        };
        
		//self-invoking function sets up inital vars
        base.init = (function(){
			opts = base.options; 
			$sliderPanels = opts.$sliderPanels;
			//logical OR operator || returns the value of the first true comparator (false if none)
			//so if $sliderPanels equals undefined then get children;
            $sliderPanels || ($sliderPanels = base.$elm .children('.' + options.panelClass));
			
            $(opts.leftNav).click(function(){
                base.moveBackwards();
            });
            $(opts.rightNav).click(function(){
                base.moveForwards();
            });
        })();
    }
    
    SimpleSlider.defaultOptions = {
        leftNav: '#left',
        rightNav: '#right',
        panelClass: 'slider-panel',
        currPanel: 0,
        $sliderPanels: ''
    }
    
    $.fn.simpleSlider = function(options){
        return this.each(function(){
            (new SimpleSlider(this, options))
        });
    }
    
})(jQuery, this, this.document);
