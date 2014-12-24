
(function($, window, document, undefined){
    $(function(){
        var ContinuousScroller = function(elm, opts){
            var base = this; //new empty object
            base.$elm = $(elm);
            base.elm = elm;
            base.opts = opts;
            base.$elm.data("cscroll", base); //set the data object
            base.$scroller = base.$elm.find(opts.scroller);
			
            
            //init function. 
            base._create = function(){
                opts.$next = $(opts.next).bind('click', base.next);
                opts.$prev = $(opts.prev).bind('click', base.prev);
                opts.liWidth = base.$scroller.find('li:first').outerWidth();
				opts.defaultWidth = base.$elm.width();
				base.setActive();
            };
			
            
            //scroll to the left
            base.next = function next(evt){
                var amount;
                evt.preventDefault();
				
                amount = (evt.amount) ? evt.amount : opts.amount;
                base.$scroller.animate({
                    left: ('-=' + (opts.liWidth * amount) + 'px')
                }, {
                    duration: opts.speed,
                    complete: function(){
                        //console.log(base.$scroller.find('li:lt(2)'))
                        base.$scroller.find('li:lt(' + amount + ')').detach().appendTo(base.$scroller);
                        base.$scroller.css({
                            left: '0px'
                        });
                        base.setActive();
                    }
                });
            };
			
            
            //scroll to the right
            base.prev = function prev(evt){
                var len, amount;
                evt.preventDefault();
                
                amount = (evt.amount) ? evt.amount : opts.amount;
                len = base.$scroller.find('li').length - (amount + 1);
                base.$scroller.find('li:gt(' + len + ')').detach().prependTo(base.$scroller);
                base.$scroller.css({
                    left: ('-' + (opts.liWidth * amount) + 'px')
                });
                base.$scroller.animate({
                    left: ('+=' + (opts.liWidth * amount) + 'px')
                }, {
                    duration: opts.speed,
                    complete: function(){
                        base.setActive();
                    }
                });
            };
			
            
            //set the element that is currently in the middle of the viewable scroll area
            base.setActive = function(){
                (function fxactive(){
                    var num;
                    if (base.$scroller.queue("fx").length > 0) {
                        setTimeout(fxactive, 10);
                    }
                    else {
                        num = Math.round((base.$elm.width() / opts.liWidth) / 2) - 1;
                        opts.$activeElm = base.$scroller.find('li:eq(' + num + ')');
                        base.$scroller.find('.' + opts.activeClass).removeClass(opts.activeClass);
                        opts.$activeElm.addClass(opts.activeClass);
                    }
                })();
            };
			
            
            //gets the element that is currently in the middle of the viewable scroll area
            base.getActive = function(){
                return opts.$activeElm;
            };
			
            
            //changes the width of the viewable area and recalculates the position of the middle active element
            base.changeWidth = function(width){
                var direction, evt, val, currentWidth;
				
				currentWidth = base.$elm.width();
				if (currentWidth !== width) {
					direction = (width - currentWidth > 0) ? 'prev' : 'next';
					val = Math.abs(((width - currentWidth) / opts.liWidth) / 2);
					base.$elm.width(width);
					evt = jQuery.Event('click');
					evt.amount = val;
					opts['$' + direction].trigger(evt);
				}
            };
            
            base._create();
        };
        
        
        $.fn.continuousScroller = function(options){
            var opts = $.extend(true, {}, $.fn.continuousScroller.defaultOptions, options || {});
            return $(this).each(function(){
                (new ContinuousScroller(this, opts));
            });
        };
        
        
        $.fn.continuousScroller.defaultOptions = {
            next: '#scroll-next', 
            prev: '#scroll-prev',
            scroller: '.scroller',
            activeClass: 'active', 	//class name of active middle element
            speed: 300, 			//animation speed
            amount: 1				//how many elements you want to scroll by when clicked
        };
        
    });
})(jQuery, this, this.document);
