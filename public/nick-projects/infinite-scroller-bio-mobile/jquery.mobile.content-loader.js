(function($, window, document, undefined){
    $(function(){
        log = function(){
        }; //console.log;
        dir = function(){
        }; //console.dir;
        $.fn.contentLoader = function(options){
            var opts = $.extend(true, {}, $.fn.contentLoader.defaultOptions, options || {});
            //private properties
            var priv = {
                $scroller: undefined,
                numbering: 0,
                imageArray: [],
                $ajaxImage: false
            };
            return $(this).each(function(){
                (new ContentLoader(this, opts, priv));
            });
        };
        
        $.fn.contentLoader.defaultOptions = {
            scroller: false, //being used with a scroller - false = stand alone
            imagePath: '',
            imageArray: [],
            imagesInfo: [],
            activeClass: 'active',
            ajaxImgName: 'ajax-loader.gif',
            ajaxImgClass: 'ajax-loader',
            ajaxImageFade: 200,
            imageFade: 300,
            scrollerImageId: 'image', //id
            autoScroll: true, //
            autoScrollInterval: 3000
        };
        
    });
    
    
    
    var ContentLoader = function(elm, opts, priv){
        var base = this;
        base.$elm = $(elm);
        base.elm = elm;
        base.opts = opts;
        base.$elm.data("cnload", base);
        
        
        //init function. 
        base._create = function(){
            showAjaxImages(true, true);
            if (!opts.scroller) {
                //scroller false = standalone
                getImageNumbering();
            }
            else {
                priv.$scroller = $(opts.scroller);
                opts.scroller = priv.$scroller[0];
                bindEvents();
            }
        };
        
        
        //there are two events fired back to the calling plugin. The one when it starts loading an image and a second when it has finsihed loading
        function fireLoadedEvent(imagePath, active){
            var evt;
            evt = jQuery.Event('EXTERNAL-CONTENT-LOADED');
            evt.active = active;
            evt.imagePath = imagePath;
            priv.$scroller.trigger(evt);
        }
        
        
        
        function bindEvents(){
            base.$elm.bind({
                'LOAD-NEXT': function(evt){
                    fireLoadedEvent(evt.imagePath, true); //fire event back at calling plugin to say image loading is active
                    loadContent(evt.imagePath);
                }
            });
        }
        
        
        //displays the ajax loader image.
        function showAjaxImages(display, createNew){
            if (createNew && !priv.$ajaxImage[0]) {
                $('<img>', {
                    src: opts.imagePath + opts.ajaxImgName,
                    'class': opts.ajaxImgClass,
                    load: function(){
                        priv.$ajaxImage = $(this);
                        display ? priv.$ajaxImage.fadeIn(opts.ajaxImageFade) : priv.$ajaxImage.fadeOut(opts.ajaxImageFade);
                        priv.$ajaxImage.prependTo(base.$elm);
                    },
                    error: function(e){
                        alert('Error loading ajax image');
                    }
                });
            }
            else {
                if (priv.$ajaxImage[0]) {
                    display ? priv.$ajaxImage.fadeIn(opts.ajaxImageFade) : priv.$ajaxImage.fadeOut(opts.ajaxImageFade);
                }
            }
        }
        
        
        //scroller-mode - loads content into DOM if it doesn't exists in array
        function loadContent(imagePath){
            var $img, newElm;
            
            newElm = true;
            //check array first
            $.each(opts.imageArray, function(i, $elm){
                if ($elm.attr('src').indexOf(imagePath) !== -1) {
                    newElm = false;
                    insertContent($elm);
                    fireLoadedEvent(imagePath, false);
                    return false;
                }
            });
            
            //create new elmement
            if (newElm) {
                showAjaxImages(true);
                log('New image ' + imagePath);
                $img = $('<img>', {
                    src: opts.imagePath + imagePath,
                    load: function(){
                        showAjaxImages(false);
                        opts.imageArray.push($(this));
                        insertContent($img);
                        fireLoadedEvent(imagePath, false);
                    },
                    error: function(e){
                        //log(e)
                    }
                });
            }
        }
        
        
        
        //Stand-alone mode
        //calculates the name numbering system used on the images and then calls the callback function i.e. image-01 or image-00001
        function getImageNumbering(callback){
            var num = '0';
            if (opts.imageArray.length === 0 && opts.imagesInfo.length === 4) {
                (function intern(){
                    var path = [opts.imagePath, opts.imagesInfo[0], num, '1.', opts.imagesInfo[1]].join('');
                    var $img = $('<img>', {
                        src: path,
                        load: function(){
                            priv.numbering = num;
                            populateArray(true);
                        },
                        error: function(){
                            num += '0';
                            setTimeout(intern, 10);
                        }
                    });
                })();
            }
            else {
                populateArray(false);
            }
        }
        
        
        /*
         * Stand-alone mode
         * @param {boolean} useImageInfo - whether to use the static image array or create an array based on information supplied to the plugin
         */
        function populateArray(useImageInfo){
            var num, path;
            if (useImageInfo) {
                opts.imageArray = [];//empty array
                try {
                    for (var i = opts.imagesInfo[2]; i <= opts.imagesInfo[3]; i++) {
                        num = priv.numbering + i;
                        if (parseInt(num) !== 1 && parseInt(num.replace(/0/g, '')) === 1) {
                            priv.numbering = priv.numbering.replace(/0/, '');
                            num = priv.numbering + i;
                        }
                        
                        path = [opts.imagePath, opts.imagesInfo[0], num, '.', opts.imagesInfo[1]].join('');
                        opts.imageArray.push(path);
                    }
                } 
                catch (e) {
                    alert('populateArray()\n' + e);
                }
            }
            else {
                opts.imageArray = $.map(opts.imageArray, function(elm, index){
                    return (opts.imagePath + elm);
                });
            }
            (opts.autoScroll) ? autoInsertContent() : '';
        }
        
        
        //Stand-alone mode
        //automatically inserts images into the DOM and displays them consecutively
        function autoInsertContent(){
            var len, count;
            
            len = opts.imageArray.length;
            count = 0;
            
            (function load(){
                if (count < len) {
                    //only show ajax image when loading new images into DOM
                    //showAjaxImages(true);
                    var $elm = $('<img>', {
                        src: opts.imageArray[count],
                        load: function(){
                            showAjaxImages(false);
                            priv.imageArray.push($elm);
                            insertContent($elm, count);
                            //fireLoadedEvent(count, opts.imageArray[count]);
                            count++;
                            setTimeout(load, opts.autoScrollInterval);
                        },
                        error: function(e){
                            log('ERROR loading image ' + opts.imageArray[count]);
                            count++;
                            setTimeout(load, 0);
                        }
                    });
                }
                else {
                    autoDisplayContent();
                }
            })();
        }
        
        
        //Stand-alone mode
        //automatically displays images consecutively that are already loaded into the DOM
        function autoDisplayContent(){
            (function nick(){
                var $next, $images, $active, len, index, nextIndex, $next;
                
                $images = base.$elm.find('img');
                $active = base.$elm.find('.' + opts.activeClass);
                len = $images.length - 1;
                index = $images.index($active);
                
                $next = (index === len) ? base.$elm.find('img:first') : $active.next();
                nextIndex = $images.index($next);
                
                //log(index, 'autoDisplayContent', $next);
                
                $active.fadeOut(opts.imageFade, function(){
                    $active.removeClass(opts.activeClass);
                    //fireLoadedEvent(nextIndex, $next);
                    $next.addClass(opts.activeClass).fadeIn(opts.imageFade, function(){
                        setTimeout(nick, opts.autoScrollInterval);
                    });
                });
            })();
        }
        
        
        function insertContent($elm, index){
            //log('insertContent', $elm);
            var $active = base.$elm.find('.' + opts.activeClass);
            if ($active[0]) {
                $active.fadeOut(opts.imageFade, function(){
                    $active.removeClass(opts.activeClass);
                    //fireLoadedEvent(index, $elm);
                    $elm.hide().addClass(opts.activeClass).appendTo(base.$elm).fadeIn(opts.imageFade);
                });
            }
            else {
                //fireLoadedEvent(index, $elm);
                $elm.hide().addClass('active').appendTo(base.$elm).fadeIn(opts.imageFade);
            }
            
        }
        
        
        base._create();
    };
    
    
    
    
    
    
})(jQuery, this, this.document);
