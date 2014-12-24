(function($, window, document){

    $(function(){
        $.fn.productsScroller = function(options){
            var opts = $.extend(true, {}, $.fn.productsScroller.defaultOptions, options || {});
            //private properties
            var priv = {
                $slideContainerLeft: null,
                $slideContainerRight: null,
                $activeSlideContainer: null,
                $categories: null,
                $lis: null,
                $next: null,
                $prev: null,
                sliderWidth: null, //the width of one slide-container
                activeClass: null,
                ajaxObj: null
            };
            
            return $(this).each(function(){
                (new ProductsScroller(this, opts, priv));
            });
        };
        
        
        $.fn.productsScroller.defaultOptions = {
            slideContainer: '.slide-container',
            categories: '.category',
            next: '#next',
            prev: '#prev',
            activeClass: '.active',
            messageBox: '#message-box'
        
        };
        
        
        var ProductsScroller = function(elm, opts, priv){
            var base = this;
            base.$elm = $(elm);
            base.elm = elm;
            base.opts = opts;
            base.$elm.data("prodscroll", base);
            
            //init function. 
            base._create = function(){
                setupPrivateVariable();
                setSliderWidth();
                bindEvents();
            };
            
            
            //PRIVATE FUNCTIONS     
            function bindEvents(){
                priv.$next.bind({
                    'click': function(evt){
                        evt.preventDefault();
                        animateScroller('next')
                    }
                });
                priv.$prev.bind({
                    'click': function(evt){
                        evt.preventDefault();
                        animateScroller('previous')
                    }
                });
            }
            
            
            
            function setupPrivateVariable(){
                priv.$activeSlideContainer = base.$elm.find(opts.slideContainer + opts.activeClass);
                priv.$categories = priv.$activeSlideContainer.find(opts.categories);
                priv.$lis = priv.$categories.find('li');
                priv.$next = $(opts.next);
                priv.$prev = $(opts.prev);
                priv.activeClass = opts.activeClass.replace('.', '');
                
                priv.$slideContainerLeft = priv.$activeSlideContainer.clone().removeClass('active').addClass('left-side').prependTo(base.$elm);
                priv.$slideContainerRight = priv.$activeSlideContainer.clone().removeClass('active').addClass('right-side').appendTo(base.$elm);            }
            
            
            function setSliderWidth(){
                var width;
                width = 0;
                priv.$categories.each(function(i, elm){
                    width = width + $(elm).outerWidth();
                });
                priv.sliderWidth = width;
                
                priv.$activeSlideContainer.css({
                    'width': priv.sliderWidth + 'px'
                });
                
                positionClonedScrollers();
            }
            
            
            
            function animateScroller(direction, scrollerEnd){
                var $oldActive, $active, offset, centre, left, sliderLeft;
                
                $oldActive = priv.$activeSlideContainer.find(opts.categories + opts.activeClass);
                $oldActive.removeClass(priv.activeClass);
                
                if (!scrollerEnd) {
                    $active = (direction === "previous") ? $oldActive.next(opts.categories) : $oldActive.prev(opts.categories);
                }
                else {
                    if (direction === "next") {
                        $active = priv.$activeSlideContainer.find('.category').last();
                    }
                    else 
                        if (direction === "previous") {
                            $active = priv.$activeSlideContainer.find('.category').first();
                        }
                }
                
                if ($active[0]) {
                    $active.addClass(priv.activeClass);
                    
                    sliderLeft = priv.$activeSlideContainer.position().left;
                    left = $active.offset().left - base.$elm.offset().left;
                    centre = (base.$elm.outerWidth() / 2) - ($active.outerWidth() / 2);
                    
                    left = (direction === "previous") ? sliderLeft - (left - centre) : sliderLeft + (centre - left);
                    
                    
                    
                    priv.$activeSlideContainer.animate({
                        'left': left + 'px'
                    }, {
                        queue: false,
                        duration: 400,
                        complete: function(){
                        }
                    });
                    
                    priv.$slideContainerLeft.animate({
                        'left': (left - priv.sliderWidth) + 'px'
                    }, {
                        queue: false,
                        duration: 400,
                        complete: function(){
                        }
                    });
                    
                    priv.$slideContainerRight.animate({
                        'left': (left + priv.sliderWidth) + 'px'
                    }, {
                        duration: 400,
                        complete: function(){
                        }
                    });
                }
                else {
                    //this is not necessary but more a fallback
                    if (direction === "previous") {
                        priv.$activeSlideContainer.css({
                            'left': priv.$slideContainerRight.position().left + 'px'
                        });
                    }
                    else 
                        if (direction === "next") {
                            priv.$activeSlideContainer.css({
                                'left': priv.$slideContainerLeft.position().left + 'px'
                            });
                        }
                    positionClonedScrollers();
                    animateScroller(direction, true);
                }
            }
            
            
            function positionClonedScrollers(){
                priv.$slideContainerLeft.css({
                    'width': priv.sliderWidth + 'px',
                    left: (priv.$activeSlideContainer.position().left - priv.sliderWidth) + 'px'
                });
                priv.$slideContainerRight.css({
                    'width': priv.sliderWidth + 'px',
                    left: (priv.$activeSlideContainer.position().left + priv.sliderWidth) + 'px'
                });
            }
            
            
            
            
            
            
            
            base._create();
        };
    });
})(jQuery, this);
