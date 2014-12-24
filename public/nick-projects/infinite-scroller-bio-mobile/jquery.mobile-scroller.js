(function($, window, document, undefined){
    $(function(){
        log = function(){
        }; //console.log;
        dir = function(){
        }; //console.dir;
        $.fn.continuousScroller = function(options){
            var opts = $.extend(true, {}, $.fn.continuousScroller.defaultOptions, options || {});
            //private properties
            var priv = {
                $next: undefined,
                $prev: undefined,
                EVENTLOADED: 'LOAD-NEXT',
                $externalPlugin: undefined,
                externalPluginActive: false,
                setTimeoutId: false
            };
            return $(this).each(function(){
                (new ContinuousScroller(this, opts, priv));
            });
        };
        
        
        $.fn.continuousScroller.defaultOptions = {
            next: '#scroll-next',
            prev: '#scroll-prev',
            scroller: '.scroller',
            activeClass: 'active', //class name of active middle element
            dataAttribute: 'data-image',
            speed: 300, //animation speed of scroller
            imageFadeIn:300, //s
			imageFadeOut:300,
			autoScrollInterval: 4000,
			scrollResizeSpeed : 300, //speed at which the scroller resizes the elements
            amount: 1, //how many elements you want to scroll by when clicked
            fixedWidthScroller: false, //width of scroller on DOM load
            loadOnClick: false, //load images when click next/prev event occurs
            parentElm: 'a',//parent elmement in which to insert image
            imagePath: 'images/', //images path
            showAjaxImage: true, //show an ajax loader gif
            ajaxImgName: 'ajax-loader.gif', //ajax loader gif file name
            ajaxImgClass: 'ajax-loader', //the class applied to the ajax loader gif
            imageLoadSpeed: 100, //time inbetween each image load if loadOnClick=false as images load consecutively
            autoScroll: false, //auto scrolls though the images
            callBack: undefined, //call back function
            callBackOnLoad: true, //set whether it calls the callback function when DOM loaded
            externalPluginId: false //id of dom element bound to the scroller
        };
        
        
        var ContinuousScroller = function(elm, opts, priv){
            var base = this;
            base.$elm = $(elm);
            base.elm = elm;
            base.opts = opts;
            base.$elm.data("cscroll", base);
            base.$scroller = base.$elm.find(opts.scroller);
            
            
            //init function. 
            base._create = function(){
                priv.$next = $(opts.next);
                priv.$prev = $(opts.prev);
                priv.$externalPlugin = $(opts.externalPluginId);
                opts.carouselActive = false; //carousel animating
                bindEvents();
                opts.liWidth = base.$scroller.find('li:first').outerWidth();
                opts.defaultWidth = base.$elm.width();
                setActiveElm(true); //set active element
                insertAjaxImages();
                //if the console is set to resize automatically then pass in the first element in the list as it only display one at a time so finding the middle element is not necesssary
                (!opts.loadOnClick) ? loadImages() : (opts.fixedWidthScroller) ? insertImage(base.$scroller.find('li:first')) : insertImage(opts.$activeElm);
                
                (opts.fixedWidthScroller) && base.changeElementWidth(opts.fixedWidthScroller); //auto resize scroller and elements to fit supplied initalWidth
                if ((!opts.fixedWidthScroller) && (base.$scroller.find('li:first').width() === 0)) {
                    alert("Please set a CSS width on the scrollable elements inside the scroller");
                }
                //if auto scroll enable and there is No external plugin run the autoscroller
                autoScroll();
                
                replaceNavigationButtons();
                //$('#console-log-mobile').text(navigator.userAgent.toLowerCase());
            };
            
            
            //PRIVATE FUNCTIONS     
            function bindEvents(){
                $('body').bind({
                    'click': function(evt){
                        if ($(evt.target).hasClass('scroller')) {
                            var id = '#' + evt.target.id;
                            if (id === opts.next) {
                                base.next(evt);
                            }
                            if (id === opts.prev) {
                                base.prev(evt);
                            }
                            return false;
                        }
                    }
                });
                if (swipeAllowed()) {
                    base.$elm.bind({
                        'swiperight': function(evt){
                            base.prev(evt);
                            return false;
                        },
                        'swipeleft': function(evt){
                            base.next(evt);
                            return false;
                        }
                    });
                    //add swipe to external plugin
                    if (priv.$externalPlugin[0]) {
                        priv.$externalPlugin.bind({
                            'swiperight': function(evt){
                                base.prev(evt);
                                return false;
                            },
                            'swipeleft': function(evt){
                                base.next(evt);
                                return false;
                            }
                        });
                    }
                }
                
                //triggered by enternal plugins
                base.$elm.bind({
                    'EXTERNAL-CONTENT-LOADED': function(evt){
                        priv.externalPluginActive = evt.active;
                        if (!priv.externalPluginActive && opts.autoScroll) {
                            priv.setTimeoutId = setTimeout(function(){
                                priv.$next.trigger('click');
                            }, opts.autoScrollInterval);
                        }
                    }
                });
            }
            
            
            function fireLoadedEvent(elm){
                if (priv.$externalPlugin[0]) {
                    var evt = jQuery.Event(priv.EVENTLOADED);
                    evt.imagePath = $(elm).attr('data-linked-image');
                    evt.elm = elm;
                    priv.$externalPlugin.trigger(evt);
                }
            }
            
            
            //checks to see if external plugin is active. The active state is trigger by events fired from the external plugin
            function checkExternalPluginActive(){
                if (priv.$externalPlugin[0]) {
                    if (!priv.externalPluginActive) {
                        clearTimeout(priv.setTimeoutId);
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return true;
                }
            }
            
            
            
            //A list of browsers or platforms that swipe OK
            function swipeAllowed(){
                var platforms = ['iPad', 'iPod', 'iPhone'];
                var agent = navigator.userAgent;
                var allowed = false;
                $.each(platforms, function(i, item){
                    if (navigator.userAgent.match(item)) {
                        allowed = true;
                        return false;
                    }
                });
                return allowed;
            }
            
            
            //there's some quirk on the iphone & jquery mobile where the nav bar drops down every time a link is clicked so we replace the 'a' element with a div
            //making sure to copy the original elements properties
            function replaceNavigationButtons(){
                var elms, $div, attrs, platforms, agent;
                
                agent = agent = navigator.userAgent.toLowerCase();
                elms = [priv.$next, priv.$prev];
                attrs = ['id', 'class', 'href', 'style'];
                platforms = ['iPhone'];
                
                $.each(platforms, function(y, platform){
                    if (agent.indexOf(platform) !== -1) {
                        $.each(elms, function(x, $elm){
                            $div = $('<div>');
                            $.each(attrs, function(i, attr){
                                var val = $elm.attr(attr);
                                (attr) && $div.attr(attr, val);
                            });
                            $div.html($elm.html());
                            $elm.wrap($div).remove();
                        });
                    }
                });
            }
            
            
            function getCarouselActive(){
                return opts.carouselActive;
            }
            
            function setCarouselActive(active){
                opts.carouselActive = active;
            }
            
            function getImageName($elm){
                return ($elm.attr(opts.dataAttribute)) ? $elm.attr(opts.dataAttribute) : !!$elm.attr(opts.dataAttribute);
            }
            
            
            
            //auto scrolls but only works if it is not being used with an external plugin, hense test for !$externalPlugin
            function autoScroll(){
                if (opts.autoScroll && !priv.$externalPlugin[0]) {
                    priv.setTimeoutId = setTimeout(function(){
                        priv.$next.trigger('click');
                        autoScroll();
                    }, opts.autoScrollInterval);
                }
            }
            
            
            //it will load the images consecutively based on the speed settings in opts.imageLoadSpeed
            function loadImages(){
                var count = 0;
                var $lis = base.$scroller.find('li[' + opts.dataAttribute + ']');
                var len = $lis.length - 1;
                if (len > 0) {
                    (function loadem(){
                        var $elm = $($lis[count]);
                        insertImage($elm);
                        if (count < len) {
                            setTimeout(loadem, opts.imageLoadSpeed);
                            count++;
                        }
                    })();
                }
            }
            
            
            //inserts an ajax loader gif into every element in the scroller that has a data-image attribute
            function insertAjaxImages(){
                if (opts.showAjaxImage) {
                    base.$scroller.find('li').each(function(index, elm){
                        var $this = $(elm);
                        if (getImageName($this)) {
                            $this.find(opts.parentElm).append($('<img>', {
                                src: opts.imagePath + opts.ajaxImgName,
                                'class': opts.ajaxImgClass
                            }));
                        }
                    });
                }
            }
            
            
            
            /* 
             * @param {boolean} DOMLoad - Indentifies whether function was called on DOM load or a click/tap/swipe event. It allows user to set whether their callback function is invoked at DOM Load
             * private set function - the element that is currently in the middle of the viewable scroll area (this is also a public set function below)
             */
            function setActiveElm(DOMLoad){
                (function fxactive(){
                    var num;
                    if (base.$scroller.queue("fx").length > 0) {
                        setTimeout(fxactive, 10);
                    }
                    else {
                        if (opts.fixedWidthScroller) {
                            opts.$activeElm = base.$scroller.find('li:first');
                        }
                        else {
                            num = Math.round((base.$elm.width() / opts.liWidth) / 2) - 1;
                            opts.$activeElm = base.$scroller.find('li:eq(' + num + ')');
                        }
                        
                        base.$scroller.find('.' + opts.activeClass).removeClass(opts.activeClass);
                        opts.$activeElm.addClass(opts.activeClass);
                        //call back function
                        if ($.isFunction(opts.callBack)) {
                            if (DOMLoad) {
                                if (opts.callBackOnLoad) {
                                    fireLoadedEvent(opts.$activeElm[0]);
                                    opts.callBack.apply(opts.$activeElm[0]);
                                }
                            }
                            else {
                                fireLoadedEvent(opts.$activeElm[0]);
                                opts.callBack.apply(opts.$activeElm[0]);
                            }
                        }
                    }
                })();
            }
            
            
            
            function insertImage($elm){
                var imageName;
                imageName = getImageName($elm);
                
                if (imageName) {
                    $('<img>', {
                        src: opts.imagePath + imageName,
                        load: function(){
                            var $img = $(this).hide();
                            
                            if ($elm.find('.' + opts.ajaxImgClass)[0]) {
                                $elm.find('.' + opts.ajaxImgClass).fadeOut(opts.imageFadeOut, function(){
                                    $(this).remove();
                                }).parent().append($img);
                            }
                            else {
                                $elm.find(opts.parentElm).append($img);
                            }
                            
                            $img.fadeIn(opts.imageFadeIn);
                            $elm.removeAttr(opts.dataAttribute);//remove the data-image attribute once image has loaded
                            setCarouselActive(false);
                        },
                        error: function(error){
                            alert('Error loading image\n' + imageName);
                        }
                    });
                }
                else {
                    setCarouselActive(false);
                }
            }
            
            
            //PUBLIC FUNCTIONS
            
            //scroll to the left
            base.next = function next(evt){
                var amount, speed;
                
                if (!getCarouselActive() && checkExternalPluginActive()) {
                    setCarouselActive(true);
                    clearTimeout(priv.setTimeoutId);
                    
                    amount = (evt.hasOwnProperty('amount')) ? evt.amount : opts.amount;
                    speed = (evt.hasOwnProperty('speed')) ? evt.speed : opts.speed;
                    
                    base.$scroller.animate({
                        left: ('-=' + (opts.liWidth * amount) + 'px')
                    }, {
                        duration: speed,
                        complete: function(){
                            base.$scroller.find('li:lt(' + amount + ')').detach().appendTo(base.$scroller);
                            base.$scroller.css({
                                left: '0px'
                            });
                            setActiveElm();
                            insertImage(opts.$activeElm);
                        }
                    });
                }
            };
            
            
            //scroll to the right
            base.prev = function prev(evt){
                var len, amount, speed;
                
                if (!getCarouselActive() && checkExternalPluginActive()) {
                    setCarouselActive(true);
                    clearTimeout(priv.setTimeoutId);
                    amount = (evt.hasOwnProperty('amount')) ? evt.amount : opts.amount;
                    speed = (evt.hasOwnProperty('speed')) ? evt.speed : opts.speed;
                    len = base.$scroller.find('li').length - (amount + 1);
                    base.$scroller.find('li:gt(' + len + ')').detach().prependTo(base.$scroller);
                    base.$scroller.css({
                        left: ('-' + (opts.liWidth * amount) + 'px')
                    });
                    base.$scroller.animate({
                        left: ('+=' + (opts.liWidth * amount) + 'px')
                    }, {
                        duration: speed,
                        complete: function(){
                            setActiveElm();
                            insertImage(opts.$activeElm);
                        }
                    });
                }
            };
            
            
            
            //public set function - sets the active element.
            base.setActiveElm = function(id){
                var $elm, amount, index;
                id = (id.indexOf('#') >= 0) ? id : '#' + id;
                $elm = $(id);
                
                clearTimeout(priv.setTimeoutId);
                
                if ($elm[0] && opts.$activeElm[0].id !== $elm[0].id) {
                    if (opts.fixedWidthScroller) {
                        var evt = jQuery.Event('click');
                        evt.amount = base.$scroller.find('li').index($elm);
                        evt.speed = 0;
                        priv.$next.trigger(evt);
                    }
                    else {
                        amount = ((base.$elm.width() / opts.liWidth) - 1) / 2;
                        index = base.$scroller.find('li').index($elm);
                        evt = jQuery.Event('click');
                        if (index === 0) {
                            index = base.$scroller.find('li').length;
                        }
                        evt.amount = index - amount;
                        evt.speed = opts.speed;
                        priv.$next.trigger(evt);
                    }
                }
            };
            
            
            //gets the element that is currently in the middle of the viewable scroll area
            base.getActiveElm = function(){
                return opts.$activeElm;
            };
            
            
            //gets the element that is currently in the middle of the viewable scroll area
            base.autoResize = function(width){
                alert("function no longer exists");
                return false;
            };
            
            
            //changes the width of the viewable area and recalculates the position of the middle active element
            base.changeScrollerWidth = function(width){
                var direction, evt, val, currentWidth;
                
                opts.fixedWidthScroller = false;
                currentWidth = base.$elm.width();
                
                if (currentWidth !== width) {
                    clearTimeout(priv.setTimeoutId);
                    direction = (width - currentWidth > 0) ? 'prev' : 'next';
                    val = Math.abs(((width - currentWidth) / opts.liWidth) / 2);
                    base.$elm.width(width);
                    evt = jQuery.Event('click');
                    evt.amount = val;
                    priv['$' + direction].trigger(evt);
                }
            };
            
            
            base.changeElementWidth = function(width){
                //log('changeElementWidth ', width);
                if (opts.liWidth !== width) {
                    clearTimeout(priv.setTimeoutId);
                    opts.fixedWidthScroller = width;
                    opts.liWidth = width;
                    base.$elm.animate({
                        width: width
                    }, opts.scrollResizeSpeed);
                    base.$scroller.find('li').animate({
                        width: width
                    }, opts.scrollResizeSpeed);
                }
            };
            
            base._create();
        };
    });
})(jQuery, this, this.document);
