(function($, window, document, undefined){
    $(function(){
        var SvgScroller = function(elm, opts){
            var base = this; //new empty object
            base.$elm = $(elm);
            base.$elm.data("svgScroller", base); //set the data object
            base.elm = elm;
            base.opts = opts;
            
            //init function. This function is called later.
            base._create = function(){
				var newId;
                opts.size = parseInt(opts.defaultSize.replace('px', ''));
                newId = base.$elm.attr('src').replace('-col', '');
                base.$elm.clone().attr('src', newId).insertBefore(base.$elm);
                base.$elm.hide();
                //
            };
            
            base.getURL = function(){
                return base.$elm.parent('a').attr('href');
            };
            
            base.active = function(){
                base.$elm.closest('li').addClass('active');
                opts.activeUrl = base.$elm.parent('a').attr('href');
                return base;
            };
            
            base.inactive = function(){
                base.$elm.closest('li').removeClass('active');
                return base;
            };
            
            base.increaseSize = function(duration){
                (!duration) && (duration = opts.duration);
                
                base.$elm.show().siblings('img').hide();
                base.$elm.closest('li').animate({
                    'margin-left': '75px',
                    'margin-right': '75px'
                }, duration);
                
                base.$elm.stop().animate({
                    'height': opts.enlargedSize,
                    'width': opts.enlargedSize
                }, {
                    'duration': duration,
                    step: function(currentLeft, obj){
                        base.resize(obj.now);
                    },
                    complete: function(){
                        opts.carouselInAction = false;
                    }
                });
                return base;
            };
            
            
            base.decreaseSize = function(duration){
                (!duration) && (duration = opts.duration);
                
                if (base.$elm.width > opts.defaultSize) {
                    base.$elm.closest('li').animate({
                        'margin-left': '5px',
                        'margin-right': '5px'
                    }, duration);
                    
                    base.$elm.stop().animate({
                        'height': opts.defaultSize,
                        'width': opts.defaultSize
                    }, {
                        'duration': duration,
                        step: function(currentLeft, obj){
                            base.resize(obj.now);
                        },
                        complete: function(evt){
                            base.$elm.hide().siblings('img').show();
                        }
                    });
                }
                return base;
            };
            
            
            base.resize = function(size){
                var top = '-' + (Math.round(size) - opts.size) + 'px';
                var left = '-' + ((Math.round(size) - opts.size) / 2) + 'px';
                
                base.$elm.css({
                    'top': top,
                    'left': left
                });
            };
            base._create();//call last
        };
        
        
        
        $.fn.svgScroller = svgScroller;
        
        $.fn.svgScroller.defaultOptions = {
			triggerVideo:true,
            nextButton: '#next',
            prevButton: '#prev',
            startDuration: 1000,//ms
            duration: 200,//ms
            triggerVideoDelay: 600,//ms
            defaultSize: '75px',
            enlargedSize: '150px',
            moveCarousel: '87px',
            activeElm: 'active',
            nextDefaults: {
                defaultLeft: '820px',
                switchedLeft1: '263px',
                switchedLeft2: '-415px'
            },
            previousDefaults: {
                defaultLeft: '-767px',
                switchedLeft2: '490px'
            }
        };
        
        function svgScroller(options){
            var opts = $.extend(true, {}, $.fn.svgScroller.defaultOptions, options || {});
            var $this = $(this);
            
            return $this.each(function(){
                (function init(){
                    opts.$container = $this;
                    opts.$carousel = $this.find('ul:first');
                    opts.$carouselClone = opts.$carousel.clone().hide().removeAttr('id').attr('id', 'carousel-clone');
                    opts.$carousel.after(opts.$carouselClone);
                    opts.$activeCarousel = opts.$carousel; //set the first carousel as active
                    opts.$activeCarousel.addClass(opts.activeElm);
                    opts.$inactiveCarousel = opts.$carouselClone;
                    //
                    opts.imageCount = opts.$carousel.find('img').length;
                    opts.carouselSwitched = false;
                    opts.carouselInAction = false;
                    opts.offset = parseInt(opts.defaultSize.replace('px', ''));
                    opts.moveCarousel = parseInt(opts.moveCarousel.replace('px', ''));
                    opts.activeUrl = 'default-url';
                    opts.timeoutId;
                    
                    $this.find('img').each(function(){
                        (new SvgScroller(this, opts));
                    });
                    
                    $(opts.nextButton).click(function(evt){
                        evt.preventDefault();
                        var e = jQuery.Event('NEXT');
                        //need diffentiate between a user clicking next and the event being triggered by the videoplayer
                        e.click = true;
                        opts.$carousel.trigger(e);
                    });
					
                    $(opts.prevButton).click(function(evt){
                        evt.preventDefault();
                        var e = jQuery.Event('PREVIOUS');
                        e.click = true;
                        opts.$carousel.trigger(e);
                    });
                })();
                
                
                $this.bind({
                    'QUEUE': function(evt){
                        //when the play event is triggered by a video it triggers the QUEUE event on the carousel which queues up the next video 
                        var fileName = getNextElement().getURL();
                        triggerVideo(evt, fileName);
                    },
                    'NEXT': function(evt){
                        move(evt, 'next');
                    },
                    'PREVIOUS': function(evt){
                        move(evt, 'previous');
                    },
                    'START': function(evt){
                        opts.carouselInAction = true;
                        var px = (parseInt(opts.previousDefaults.defaultLeft.replace(/[-px]/g, ''))) - opts.moveCarousel;
                        opts.$inactiveCarousel.css('left', '-' + px + 'px').show();
                        getElement(4).active().increaseSize(opts.startDuration);
                        triggerVideo(evt);
                        opts.$carousel.animate({
                            'left': '0px'
                        }, opts.startDuration);
                    }
                });
                
                
                //Start the video playing. 'fileName' argument is only passed in by the QUEUE event
                function triggerVideo(evt, fileName){
                    log('START-VIDEO ', opts.activeUrl);
                    var e = jQuery.Event('START-VIDEO');
                    e.click = (!evt.click) ? false : true;
                    e.fileName = (fileName) ? fileName : opts.activeUrl;
					if (opts.triggerVideo) {
						$('#video').trigger(e);
					}
                }
                
                
                function move(evt, direction){
                    var activeImg, nextImg;
                    if (!opts.carouselInAction) {
                        opts.carouselInAction = true;
                        //console.clear();
                        log(direction);
                        
                        activeImg = getActiveElement();
                        nextImg = (direction === 'next') ? getNextElement() : getPreviousElement();
                        activeImg.inactive().decreaseSize();
                        nextImg.active().increaseSize();
                        setActiveCarousel();
                        (direction === 'next') ? moveCarouselsNext() : moveCarouselsPrevious();
                        
                        //play video
                        opts.timeoutId && clearTimeout(opts.timeoutId);
                        opts.timeoutId = setTimeout(function(){
                            triggerVideo(evt);
                        }, opts.triggerVideoDelay);
                    }
                }
                
                
                function moveCarouselsPrevious(){
                    var left1, left2;
                    left1 = left2 = ('+=' + opts.moveCarousel);
                    
                    if (getActiveElementIndex() === 4) {
                        log('POSITION RIGHT');
                        opts.$inactiveCarousel.css('left', opts.previousDefaults.defaultLeft);
                    }
                    
                    if (opts.carouselSwitched) {
                        opts.carouselSwitched = false;
                        left2 = opts.previousDefaults.switchedLeft2;
                    }
                    
                    opts.$activeCarousel.animate({
                        'left': left1
                    }, opts.duration);
                    
                    opts.$inactiveCarousel.animate({
                        'left': left2
                    }, opts.duration);
                    
                    log('moveCarouselsNext()');
                }
                
                
                function moveCarouselsNext(){
                    var left1, left2;
                    left1 = left2 = ('-=' + opts.moveCarousel);
                    
                    if (getActiveElementIndex() === 5) {
                        log('POSITION LEFT');
                        opts.$inactiveCarousel.css('left', opts.nextDefaults.defaultLeft);
                    }
                    
                    if (opts.carouselSwitched) {
                        opts.carouselSwitched = false;
                        left1 = opts.nextDefaults.switchedLeft1;
                        left2 = opts.nextDefaults.switchedLeft2;
                    }
                    
                    opts.$activeCarousel.animate({
                        'left': left1
                    }, opts.duration);
                    
                    opts.$inactiveCarousel.animate({
                        'left': left2
                    }, opts.duration);
                    
                    log('moveCarouselsNext()');
                }
                
                
                function setActiveCarousel(){
                    var prevId = opts.$activeCarousel.attr('id');
                    opts.$activeCarousel = opts.$container.find('li.' + opts.activeElm).parent('ul');
                    opts.$inactiveCarousel = opts.$container.find('ul').not('#' + opts.$activeCarousel.attr('id'));
                    if (prevId !== opts.$activeCarousel.attr('id')) {
                        opts.carouselSwitched = true;
                        log('SWITCHED');
                    }
                    log('setActiveCarousel()', opts.$activeCarousel);
                }
                
                
				function getElement(num){
                    var $li = opts.$activeCarousel.find('li:eq(' + (num - 1) + ')');
                    log('getElement() ', $li);
                    return $li.find('img:last').data('svgScroller');
                }
				
				
                function getActiveElementIndex(){
                    var $li = opts.$activeCarousel.find('li.' + opts.activeElm);
                    var index = opts.$activeCarousel.find('li').index($li) + 1;
                    log('getActiveElementIndex() ' + index, $li);
                    return index;
                }
                
				
                function getActiveElement(direction){
                    var $li = opts.$activeCarousel.find('li.' + opts.activeElm);
                    log('getActiveElement() ', $li);
                    return $li.find('img:last').data('svgScroller');
                }
                
                
                function getNextElement(){
                    var index = getActiveElementIndex();
                    var $li = (index === opts.imageCount) ? opts.$inactiveCarousel.find('li:first').addClass(opts.activeElm) : opts.$activeCarousel.find('li.' + opts.activeElm).next('li');
                    log('getNextElement() ', $li);
                    return $li.find('img:last').data('svgScroller');
                }
                
                
                function getPreviousElement(){
                    var index = getActiveElementIndex();
                    var $li = (index === 1) ? opts.$inactiveCarousel.find('li:last').addClass(opts.activeElm) : opts.$activeCarousel.find('li.' + opts.activeElm).prev('li');
                    log('getPreviousElement() ', $li);
                    return $li.find('img:last').data('svgScroller');
                }
                
                
                (function start(){
                    $this.trigger('START');
                })();
            });
        }
    });
})(jQuery, this, this.document);
