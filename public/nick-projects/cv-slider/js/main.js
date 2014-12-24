/**
 * @author Nick Lowman
 */
var nicklowman = (function(parent, $, window, document, undefined){
    //DOM Ready
    var timerId, 
		mouseWheelTimerId, 
		mouseWheel = false, //true when mouse wheel is in use 
		$lastElm,
		log,
		$wrapper = $('#wrapper');
    
    
	//Center elements in window
    $.fn.center = function(){
        this.css("position", "absolute");
        //this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
        //this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
		this.css("left", ($wrapper.width() - this.width()) / 2 + $wrapper.scrollLeft() + "px");
        return this;
    }
    
    
    //NickSlide constructor function expression
    NickSlide = function(elm, config){
        var base = this; //new empty object
        base.$elm = $(elm);
        base.elm = elm;
        base.$elm.data("nickslide", base);
        base.config = {}
        base.visted = function(){
            base.$elm.closest('li').addClass('visted');
        };
        
        //init actions
        (function(){
            $.extend(true, base.config, config);
            base.$elm
			.fadeTo(300, 0.6)
			.hover(
				//MOUSE OVER
				function(){
	                $lastElm = base.$elm;
	                base.config.$infoWrapper.trigger('SLIDE-OUT', {
	                    $elm: base.$elm
	                });
	                base.$elm.stop().fadeTo(300, 1);
	            }, 
				//MOUSE OUT
				function(){
	                base.$elm.stop().fadeTo(300, 0.6);
	                if (!mouseWheel) {
	                    timerId = setTimeout(function(){
	                        base.config.$infoWrapper.trigger('SLIDE-BACK')
	                    }, 1000)
	                }
            })
			.click(function(){
                base.visted();
				base.config.$linksWrapper.trigger('HIDE');
                base.config.$linksWrapper.trigger('SLIDE-OUT', {
                    $elm: base.$elm
                });
				return false;
            });
        })();
    };
    
    
    /*
     * nickSlide plug-in
     * Uses the NickSlide constructor function to add a data object to each element supplied to the plug-in
     */
    //
    $.fn.nickSlide = function(config){
        return $(this).each(function(){
			console.log(this);
            new NickSlide(this, config);
        });
    };
    

    
    $(function(){
        var $paneTarget = $('#pane-target'), 
			$logoWrapper = $('#logo-wrapper').center(), 
			$infoWrapper = $('#info-wrapper'), 
			$info = $('#info'), 
			$linksWrapper = $('#links-wrapper'), 
			$links = $('#links'), 
			$currentLinks, //stores a reference to the original html of the currently displayed links
			$shadow = $('#shadow'), 
			$header = $('#header'), //contains drag bar and navigation
			$wikiFrame = $('#wikiframe'),
			counter = 1, 
			liCount = $paneTarget.find('li').length, 
			liHeight = $paneTarget.find('li:first').height(), 
			liVisible = Math.round($paneTarget.height() / liHeight), 
			maxCount = liCount - liVisible, 
			calcClick, 
			lastMove;
        
        
        //These bindings control the functionality of the main logo strip
        $paneTarget.bind({
            'CALCULATE-MOVE': function(evt, data){
                var $link = $(data.link), clarse = data.clarse, move, calcClick;
                
                calcClick = {
                    top: function(){
                        counter = 1;
                        return 0;
                    },
                    bottom: function(elm){
                        counter = maxCount + 1;
                        return maxCount;
                    },
                    next: function(){
                        if (counter === maxCount + 1) {
                            return maxCount;
                        }
                        else {
                            return counter++;
                        }
                    },
                    previous: function(){
                        if (counter <= 1) {
                            return 0
                        }
                        else {
                            counter--;
                            return counter - 1;
                        }
                    }
                }
                $(this).trigger('SLIDE-LOGOS', {
                    move: calcClick[clarse]()
                });
            },
            'SLIDE-LOGOS': function(evt, data){
                if (data.move != lastMove) {
                    lastMove = data.move;
                    $paneTarget.stop().scrollTo('li:eq(' + data.move + ')', 800, {
                        onAfter: function(){
                        }
                    });
                }
            }
        });
		
		
		$wikiFrame.bind({
			'click':function(evt){
				if(evt.target.className==='close'){
					$wikiFrame.slideUp(500);//.find('iframe').src = '';
				}
			}
		})
		
		
		/*
		 * These bindings control the functionality of the links that appear on the right side of the logo bar
		 */
        $linksWrapper.bind({
			'mouseover':function(evt){
				if(evt.target.nodeName==='IMG'){
					$(evt.target).stop().fadeTo(300, 1.0);
					evt.stopPropagation();
				}
			},
			'mouseout':function(evt){
				if(evt.target.nodeName==='IMG'){
					$(evt.target).stop().fadeTo(300, 0.6);
					evt.stopPropagation();
				}
			},
			'click':function(evt){
				//add class to clicked element but also add it to the orginal html from which is was inserted
				var $elm = $(evt.target).closest('li');
				var index = $elm.closest('ul').find('li').index($elm); //get index value of li that which was clicked
				$elm.addClass('visited');
                $currentLinks.next('div').find('li:eq(' + index + ')').addClass('visited');
				
				$('iframe')[0].src = $elm.find('a')[0].href;
				
				return false;
			},
            'SLIDE-OUT': function(evt, data){                
				$currentLinks = $(data.$elm.closest('a')[0].hash);
				var html = $currentLinks.next('div').html();//get HTML to insert into $info
				$links.hide().html(html).css({
                    top: (data.$elm.closest('li').position().top +$header.height()) + 'px',
                    left: '-' + ($links.width() + 10) + 'px'
                }).show().stop(true, true).show().animate({
                    left: '-5px'
                }, 200);
            },
            'HIDE': function(evt, data){
                $links.hide().css({
                    left: '-5px'
                });
            },
            'POSITION': function(evt){
                $(evt.target).css({
                    //left: $logoWrapper.offset().left + $logoWrapper.outerWidth() + 'px',
					left: $logoWrapper.position().left + $logoWrapper.outerWidth() + 'px',
                    height: $logoWrapper.outerHeight() + 'px'
                });
            }
        });
        
        
		
        //These bindings control the functionality of the link information area that appear to the left of the logo bar
        $infoWrapper.bind({
            'SLIDE-OUT': function(evt, data){
				if (!mouseWheel) {
					clearTimeout(timerId);
					var html = $(data.$elm.closest('a')[0].hash).html();//get HTML to insert into $info
					$info.hide().html(html).css({
						top: (data.$elm.closest('li').position().top + $header.height()) + 'px',
						right: '-515px'
					}).stop().show().delay(200).animate({
						right: '0px'
					}, 200);
				}
            },
            'SLIDE-BACK': function(evt){
					$info.animate({
						right: '-515px'
					}, 400, function(){
						$info.hide();
					})
            },
            'HIDE': function(evt, data){
                $info.hide().css({
                    right: '-515px'
                });
            },
            'POSITION': function(evt){
                $(evt.target).css({
                    left:  ($logoWrapper.position().left - $('#info-wrapper').width()+5) + 'px',
                    height: $logoWrapper.outerHeight() + 'px'
                });
                $info.hover(function(){
                    clearTimeout(timerId);
                }, function(){
                    $(this).trigger('SLIDE-BACK');
                })
            }
        });
		
        
        //Navigation that appears above the logo bar
        $('#nav a').click(function(){
            $paneTarget.trigger('CALCULATE-MOVE', {
                link: this,
                clarse: $(this).closest('li').attr('class')
            });
            $infoWrapper.trigger('HIDE');
			$linksWrapper.trigger('HIDE');
            return false;
        });
        
        
        /*
         * Bind Mouse scroll wheel event to the body. To stop the animations happening when mouse wheel is in use we use a timer.
         */
		if (!$.browser.msie) {
			$('body').bind('mousewheel', function(event, delta, deltaX, deltaY){
				//log(delta, deltaX, deltaY);
				mouseWheel = true;
				clearTimeout(mouseWheelTimerId);
				$linksWrapper.trigger('HIDE');
				mouseWheelTimerId = setTimeout(function(){
					mouseWheel = false;
					$infoWrapper.trigger('SLIDE-OUT', {
						$elm: $lastElm
					});
				}, 1000);
				
				$infoWrapper.trigger('HIDE');
				var clarse = (delta === 1) ? 'previous' : 'next';
				$paneTarget.trigger('CALCULATE-MOVE', {
					clarse: clarse
				});
			});
		}
        
        //position the div containing the link information which appears on the left
        $infoWrapper.trigger('POSITION');
       
        //position the div containing the links which appears on the right
        $linksWrapper.trigger('POSITION');
        
        //position the shadow
        $shadow.css({
			top: '10px',
            left: $logoWrapper.position().left + 10 +'px',
            width: $logoWrapper.outerWidth() + 10 + 'px',
            height: $logoWrapper.outerHeight() + 20 + 'px'
        });
       
        //configure plugin for images
        $paneTarget.find('a > img').nickSlide({
            $infoWrapper: $infoWrapper,
			$linksWrapper: $linksWrapper,
            offset: $paneTarget.offset().left
        });
		

        
    })
    
    
    
    return parent;
})(nicklowman || {}, jQuery, this, this.document);
