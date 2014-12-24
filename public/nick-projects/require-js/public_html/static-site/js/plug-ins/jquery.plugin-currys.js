/*
 * The Bio Agency http://www.thebioagency.com/
 * Project: Dixons Christmas List
 * ID:00001
 */
//Added image preloader to stop the flicker
var preloadImages = (function($, window, document, undefined){
    var preloadImages = function(){
        $.preloadImages({
            imagePath: '../images/',
            imagePathArray: ['q2answers_answer_bg.png', 'q4answers_answer_bg.png', 'question2answer1_hover.gif', 'question2answer2_hover.gif', 'question2answers_bg.jpg', 'question3answer1_hover.gif', 'question3answer2_hover.gif', 'question3answer3_hover.gif', 'question3answers_bg.jpg', 'question4answer1_hover.gif', 'question4answer2_hover.gif', 'question4answer3_hover.gif', 'question4answer4_hover.gif', 'question4answers_bg.jpg', 'ttip_bottom.png', 'ttip_top.png']
        }, function(imagesArray, pathErrors){
            //console.log('EXAMPLE 2\n', imagesArray, '\n', pathErrors);
        });
    };
    return preloadImages;
})(jQuery, this, this.document);


(function($, window, document, undefined){

    var _ie6 = (navigator.userAgent.indexOf('MSIE 6.0') !== -1) ? true : false;
    var _ie7 = (navigator.userAgent.indexOf('MSIE 7.0') !== -1) ? true : false;
    var _safari = (navigator.userAgent.toLowerCase().indexOf('safari') > -1 && navigator.userAgent.toLowerCase().indexOf('chrome') === -1) ? true : false;
    var _oldHTML;
    var _fadeInComplete = false;
    var _num = 0;
    var _url;
    var _$journeySteps;
    var _$stepsTip;
    
    
    
    //utility function for firebug development with IE.
    (function configureFirebugConsole(){
        if (!("console" in window) || !("firebug" in console)) {
            var names = ["clear", "log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
            window.console = {};
            for (var i = 0; i < names.length; ++i) 
                window.console[names[i]] = function(){
                };
        }
    })();
    
    
    
    //URL Fragmenter
    _url = (function(){
        var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
        var result = parse_url.exec(window.location.href);
        var names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
        var mObj = {};
        var qObj = {};
        var length = names.length;
        
        for (var i = 0; i < length; i += 1) {
            (!result[i]) ? result[i] = '' : result[i];
            mObj[names[i]] = '' + result[i] + '';
        }
        
        if (mObj['query'] !== '') {
            var query = mObj['query'].split('&');
            length = query.length;
            
            for (var i = 0; i < length; i++) {
                var split = query[i].split('=');
                try {
                    qObj[split[0]] = split[1];
                } 
                catch (e) {
                }
            }
            mObj.querySplit = qObj;
        }
        return mObj;
    })();
    
    
    
    
    //DOM Loaded start functionality
    $(function(){
        _$journeySteps = $('#journey-steps');
        _$stepsTip = $('#steps-tip');
        
        removeMissingProductsMaps();
        setupStepsToolTip();
        setupHomePageForm();
        setupProductsScroller();
        setupProductSpread();
        setupAnswers();
        setupUserMessage();
    });
    
    
    
    
    //Removes the area maps that don't have any product information
    function removeMissingProductsMaps(){
        var $productContainer = $('#product-container');
        var $productInfo;
        var title;
        var $areas;
        
        if ($productContainer[0]) {
            $areas = $productContainer.find('area[coords]');
            $areas.each(function(){
                var $this = $(this);
                $productInfo = $($this.attr('class').replace(/pid/g, '#uid'));
                
                if ($productInfo[0]) {
                    title = $productInfo.find('.title').text();
                    if (title.indexOf('not found') !== -1) {
                        $this.remove();
                    }
                }
                else {
                    $this.remove();
                }
            });
        }
    }
    
    
    
    
    
    function setupHomePageForm(){
        $('.home .text').focus(function(){
            var $this = $(this);
            var $label = $this.siblings('label');
            //$label.hide().css({top:'-15px'}).fadeIn(300);
            $label.stop().animate({
                top: '-15px'
            }, 300);
            $this.addClass('focussed');
            $label.addClass('focussed');
            
        }).blur(function(){
            var $this = $(this);
            var $label = $this.siblings('label');
            if ($this.val() == '') {
                $label.stop().animate({
                    top: '14px'
                }, 300);
                $this.removeClass('focussed');
                $label.removeClass('focussed');
                
            }
        });
    }
    
    
    
    
    function setupAnswers(){
        var btns = $('.answer .btn');
        btns.hover(function(){
            var i = btns.index(this);
            $('.hover_answer:eq(' + i + ')').addClass('hover_answer_over');
        }, function(){
            $('.hover_answer').removeClass('hover_answer_over');
        });
    }
    
    
    
    /*
     * This is the steps navigation tool-tip.
     * */
    function setupStepsToolTip(){
        var $steps;
        var $text;
        var timer;
        var $tipArrow = _$stepsTip.find('.top');
        var $completed;
        
        var stepsText = {
            'step1': 'STEP 1',
            'step2': 'STEP 2',
            'step3': 'STEP 3',
            'step4': 'STEP 4',
            'step5': 'STEP 5'
        };
        var stepsTextComp = {
            'step1': 'CLICK TO RETURN TO STEP 1',
            'step2': 'CLICK TO RETURN TO STEP 2',
            'step3': 'CLICK TO RETURN TO STEP 3',
            'step4': 'CLICK TO RETURN TO STEP 4',
            'step5': "CLICK TO RETURN TO STEP 5"
        };
        
        if (_$stepsTip[0]) {
            $steps = _$journeySteps.find('li');
            $text = _$stepsTip.find('.middle');
            
            $steps.find('.completed').last().addClass('active');
            
            
            $steps.hover(function(){
                var pos;
                var text;
                $this = $(this);
                
                if (!$this.find('>a').hasClass('active')) {
                    text = ($this.find('a').hasClass('completed')) ? stepsTextComp['step' + ($steps.index(this) + 1)] : stepsText['step' + ($steps.index(this) + 1)];
                    $text.text(text);
                    pos = ($this.position().left - _$stepsTip.width() / 2) + $this.width() / 2 + 'px';
                    _$stepsTip.css('left', pos);
                    
                    //($.browser.msie) ? _$stepsTip.show() : _$stepsTip.fadeIn(300);
                    _$stepsTip.show();
                    
                    if (_ie6 || _ie7) {
                        $tipArrow.width(_$stepsTip.find('.middle').width() + 30);
                    }
                }
                
            }, function(){
                _$stepsTip.hide();
            });
        }
        
        if (_url.path === 'result10.php') {
            _$journeySteps.find('li:last').hide();
        }
        
        
        
        //show steps tool tip when they first land on the result page
        //$.cookie('show-tool-tip', null);
        if ($('#product-container')[0]) {
            if (!$.cookie('show-tool-tip')) {
                if (_url.path === 'result10.php') {
                    _$journeySteps.find('li:eq(2)').trigger('mouseenter');
                }
                else {
                    _$journeySteps.find('li:eq(3)').trigger('mouseenter');
                }
                $.cookie('show-tool-tip', 'viewed', {
                    expires: null //session cookie
                });
            }
        }
    }
    
    
    
    /*
     * Displays a how-to message the first time the user gets to the results page
     */
    function setupUserMessage(hide){
        var $userMessage = $('#user-message');
        var $closeButton;
        var cookie_str;
        
        if ($userMessage[0]) {
            $closeButton = $userMessage.find('.close');
            $closeButton.bind('click', function(evt){
                if ($.browser.msie) {
                    $userMessage.hide();
                }
                else {
                    $userMessage.fadeOut();
                }
                evt.preventDefault();
                $('#top-ten-links').animate({
                    'top': 0
                });
            });
            
            // $.cookie('user-message-' + window.location.href, null);
            
            cookie_str = 'user-message-' + window.location.href;
            
            if (!$.cookie(cookie_str)) {
                $userMessage.show();
                $('#top-ten-links').css('top', -80);
                $.cookie(cookie_str, 'viewed', {
                    expires: null //session cookie 
                });
            }
            
            if (hide) {
                $userMessage.hide();
                $('#top-ten-links').animate({
                    'top': 0
                });
            }
        }
    }
    
    
    
    /*
     * 'Related Products' scroller set up
     */
    function setupProductsScroller(){
        var $scroller = $('#product-scroller');
        var $imageHover;
        var timeout;
        var $next;
        var $back;
        var $items;
        
        if ($scroller[0]) {
            //if there are no items to scroll then insert empty div
            if ($scroller.find('.items li').length === 0) {
                $scroller.empty().prepend('<div id="scroller-empty">');
                return false;
            }
            
            //stop scroller navingation link actioning
            $scroller.find('.next a').add('.back a').bind('click', function(evt){
                evt.preventDefault();
            });
            
            $next = $scroller.find('.next');
            $back = $scroller.find('.back');
            
            $scroller.find('.scrollable').scrollable({
                keyboard: 'static', //arrows keys work
                next: $next,
                prev: $back,
                speed: 700,
                easing: 'easeInOutQuint',//easing js
                items: '.scrollable-items'
            });
            
            $imageHover = $scroller.find('.image-hover').hide();
            $items = $scroller.find('.items li');
            
            if ($items.length < 7) {
                $next.addClass('disabled');
                $back.addClass('disabled');
            }
            
            $items.click(function(){
                if (!_safari) {
                    //$('#normal-fade').fadeTo(500, 0.5);
                }
            });
            
            $items.hover(function(){
				var $info; 
                if (timeout) {
                    clearTimeout(timeout);
                }
				
                //$imageHover.stop(true, true).fadeTo(300, 0.4); //this is the 
                $(this).find('.image-hover').stop().hide();
				$info = $(this).find('div.info');
				
				var height = 75 - $info.height() + 'px';
                $info.stop().animate({
                    'top': height
                });
				
                
            }, function(){            
                $(this).find('div.info').stop().animate({
                    'top': '85px'
                });
				
                timeout = setTimeout(function(){
                    //$imageHover.fadeOut(300);
                }, 500);
            });
        }
    }
    
    
    
    /*
     * @param {boolean} ajax - is true if the function is called from inside the AJAX function
     * This function contains all the functionality for the product spread
     */
    function setupProductSpread(ajax){
        var $productContainer = $('#product-container');
        
        if ($productContainer[0]) {
            var $productSpread = $('#product-spread');
            var $productSpreadBg = (_ie6) ? $('#product-spread-bg > div') : $('#product-spread-bg');
            var $product = $('#product');
            var $productInfoTip = $('#product-info-tip'); //Small product info box
            var $productMoreInfoTip = $('#product-more-info-tip'); //large product info box
            var $ajaxFade = $('#ajax-fade');
            var $normalFade = $('#normal-fade');
            var $backButton = $('#back-button');
            var spreadName = $productSpread.attr('class');
            var $areas = $productSpread.find('area[coords]');
            var alt; //alt tag of ative product
            var $productInfo;//id of elmemet with product info
            var $lastAreaMap; //stores last map mouse'd over
            $productContainer.find('[alt]').removeAttr('alt'); //remove all the alt tags so they don't appear when mousing over
            if (!$.browser.msie) {
                $productContainer.addClass('not-ie');
            }
            
            if (!$ajaxFade[0]) {
                $ajaxFade = $('<div id="ajax-fade">').prependTo('#wrapper');
            }
            if (!$normalFade[0]) {
                $normalFade = $('<div id="normal-fade">').prependTo('#wrapper');
            }
            
            if (_ie6) {
                $productSpreadBg.addClass(spreadName);
            }
            
            window.load = function(){
                $normalFade.hide();
            }
            
            
            function areaMapBindings(){
                $areas.bind({
                    'mouseenter.productSpread': productMouseOver,
                    'click.productSpread': function(evt){
                        displayProductMoreInfoTip($(this), true);//show prouduct info
                        evt.preventDefault();
                    }
                });
            }
            
            
            //Top ten products AJAX functionality. If #back-button doesn't exist then bind functionality
            if (!$backButton[0]) {
                var ajaxActive = false;
                
                $('#top-ten-links .ten').bind('click', function(evt){
                    if (!ajaxActive) {
                        ajaxActive = true;
                        var $this = $(this);
                        
                        if ($this.hasClass('active')) {
                            if (_safari) {
                                $ajaxFade.stop().fadeIn(500, function(){
                                    window.location.href = window.location.href;
                                });
                            }
                            else {
                                var $this = $(this);
                                
                                $ajaxFade.stop().fadeIn(500, function(){
                                    _fadeInComplete = true;
                                });
                                
                                (function fadeNotReady(){
                                    if (_fadeInComplete) {
                                        _fadeInComplete = false;
                                        $productContainer.empty().html(_oldHTML);
                                        setupProductSpread(true);
                                        $ajaxFade.stop().fadeOut(500);
                                        $('#top-ten-links .ten').removeClass('active');
                                        $('body').removeClass('ajax');
                                    }
                                    else {
                                        setTimeout(fadeNotReady, 100);
                                    }
                                })();
                            }
                        }
                        else {
                            displayProductMoreInfoTip($(this), false); //close product info box
                            setupUserMessage(true); //hides the user message if displayed
                            $ajaxFade.stop().fadeIn(500, function(){
                                _fadeInComplete = true;
                            });
                            
                            _oldHTML = $productContainer.clone().html();
                            
                            var request = $.ajax({
                                type: "POST",
                                url: $this.attr('href'),
                                success: function(msg){
                                    (function fadeNotReady(){
                                        if (_fadeInComplete) {
                                            _fadeInComplete = false;
                                            $productContainer.empty().html(msg);
                                            setupProductSpread(true);
                                            $('#top-ten-links .ten').addClass('active');
                                            $('body').addClass('ajax');
                                            $ajaxFade.stop().fadeOut(1000);
                                            ajaxActive = false;
                                            
                                            //request.abort();
                                        }
                                        else {
                                            setTimeout(fadeNotReady, 100);
                                        }
                                    })();
                                },
                                error: function(){
                                    _fadeInComplete = false;
                                    $ajaxFade.hide();
                                    //show error message;
                                }
                            });
                        }
                    }
                    evt.preventDefault();
                });
            }
            
            
            //functionality for product mouseover. This function is bound to mouseover but is also called from bindProductContainer
            function productMouseOver($elm){
                !!($elm[0] === undefined) && ($elm = $(this));
                $areas.unbind('mouseenter.productSpread');
                $elm.bind({ //this is the current area map
                    'mouseleave.productSpread': productMouseOut
                });
                hightlightAdd($elm);
            }
            
            
            //functionality for product mouseout
            function productMouseOut(){
                $areas.unbind('mouseleave.productSpread');
                $areas.bind({
                    'mouseenter.productSpread': productMouseOver
                });
                hightlightRemove($(this));
            }
            
            //add a hightlight around the product which is currently mouse'd over
            function hightlightAdd($elm){
                alt = $elm.attr('class');
                $productSpreadBg.addClass(spreadName);
                $product.removeClass().addClass(alt).fadeIn(300);
                $productSpread.removeClass(spreadName);
                //displayProductInfoTip($elm, true);
            }
            
            //remove hightlight around the product which is currently mouse'd over
            function hightlightRemove($elm){
                $productSpread.addClass(spreadName);
                if (!_ie6) {
                    $productSpreadBg.removeClass(spreadName);
                }
                $product.hide().stop(true, true).removeClass(alt);
                //$elm && displayProductInfoTip($elm, false);
            }
            
            //hightlight a product is 'selected' pid is in the query string
            if (_url.querySplit !== undefined && _url.querySplit.selected !== undefined) {
                var $elm = $('.' + _url.querySplit.selected);
                if ($elm[0]) {
                    hightlightAdd($elm);
                }
            }
            
            
            /*
             * This displays the smaller product info box
             * @param {Object} $elm  : area element which recieved the mouseover event
             * @param {boolean} show : show or hide the product box
             */
            function displayProductInfoTip($elm, show){
                var position;
                var pos;
                
                try {
                    position = $elm.attr('href').split(':');
                    if (show) {
                        //we need to display the element first to get it's width properties, whilst keeping it hidden by visibility
                        $productInfoTip.removeClass('left').removeClass('right').addClass(position[4]).css({
                            'visibility': 'hidden'
                        }).show().find('.info').html($productInfo.find('.title').html());
                        
                        pos = readCoords($elm, position, $productInfoTip);
                        
                        $productInfoTip.hide().css({
                            'visibility': 'visible',
                            top: pos.posY,
                            left: pos.posX
                        }).find('.info').html($productInfo.find('.title').html());
                        
                        
                        ($.browser.msie) ? $productInfoTip.show() : $productInfoTip.fadeIn(300);
                    }
                    else {
                        $productInfoTip.hide().stop(true, true).find('.info').empty();
                    }
                } 
                catch (e) {
                    $productInfoTip.hide().find('.info').empty();
                    //console.log(e);
                }
            }
            
            
            //setup the bindings for the larger product info box
            function productMoreInfoBindings(){
                $productMoreInfoTip.bind('click', function(evt){
                    $li = $(evt.target).closest('li');
                    $li.hasClass('close') && displayProductMoreInfoTip($(this), false); //close product info box
                    if ($li.hasClass('more-info') || $li.hasClass('buy')) {
                        //do not stop event delegation
                        if (!_safari) {
                            //browser back button doesn't clear fade in safari
                            //$normalFade.fadeTo(500, 0.5);
                        }
                    }
                    else {
                        evt.preventDefault();
                    }
                });
            }
            
            
            /*
             * If the large product info box is displayed we want to be able to close it by clicking anywhere outside of the box itself or the hightlighted product.
             * To do this we have to make sure the click event didn't occur on the active product or product info box.
             * We do it this way rather than using event bubbling as we removed all events when the product info box was displayed.
             * Also have to track the last element mouse'd over so if a user clicks outside of the active product but it's on another product
             * then we have to highlight that product
             *
             * @param {Object} $elm : area element which recieved the click event
             * @param {boolean} bind : bind or unbind the click event
             */
            function bindProductContainer($elm, bind){
                if (bind) {
                    $productContainer.bind({
                        'click.productSpread': function(evt){
                            $target = $(evt.target);
                            
                            //console.log($target.attr('target'));
                            
                            if ($target.attr('target') !== '_parent' && (($target.attr('class') === $elm.attr('class')) || $target.closest('.tip')[0])) {
                                return false;
                            }
                            
                            $productContainer.unbind('mouseover.productSpread');//used for tracking mouse'd over element
                            displayProductMoreInfoTip(undefined, false);//hide 'more info' box
                            //highlight mouse'd over product
                            if ($lastAreaMap[0].nodeName === 'AREA' && $lastAreaMap.not('.active')) {
                                if ($productInfoTip.hasClass('right')) {
                                    $productInfoTip.removeClass('right');
                                };
                                productMouseOver($lastAreaMap);
                            }
                            
                            $lastAreaMap = undefined; //reset the $lastAreaMap
                            //continue with the default link action if target=_parent
                            if ($target.attr('target') !== '_parent') {
                                evt.preventDefault();
                            }
                        },
                        'mouseover.productSpread': function(evt){
                            $lastAreaMap = $(evt.target); //track the last element mouse'd over
                        }
                        
                        
                    });
                }
                else {
                    $productContainer.unbind('click.productSpread');
                }
            }
            
            
            /*
             *
             * @param {Object} $elm - area element which recieved the event
             * @param {Object} position - is the title arrtibute of the area element which looks like [0:0:left]
             * @param {Object} $tip - the element which needs positioning
             */
            function readCoords($elm, position, $tip){
                var coords = $elm.attr('coords').split(',');
                var length = coords.length;
                var left = (position[4] === 'left') ? true : false;
                var posX = (left) ? 10000000 : 0;
                var posY = 10000000;
                var offsetX = parseInt(($tip[0].id === 'product-info-tip') ? position[0] : position[2]);
                var offsetY = parseInt(($tip[0].id === 'product-info-tip') ? position[1] : position[3]);
                
                
                
                $.each(coords, function(i, val){
                    val = parseInt(val);
                    if (i % 2 === 0) {
                        (left) ? ((val < posX) && (posX = val)) : ((val > posX) && (posX = val));
                    }
                    else {
                        (val < posY) && (posY = val);
                    }
                });
                
                (left) ? (posX = (posX - $tip.width()) + offsetX) : (posX = posX - offsetX);
                
                //keep it from going off bottom of page
                if ((posY + $tip.height()) > 432) {
                    ($tip[0].id === 'product-info-tip') ? posY = 350 : posY = 290;
                }
                
                //keep it from going off top of page
                if (posY < 20) {
                    posY = 20;
                }
                
                return {
                    posX: posX + 'px',
                    posY: (posY + offsetY) + 'px'
                };
            }
            
            
            
            
            /*
             * @param {num} txtElmWidth : This is the width of the product title
             * @param {string} txt : This is the product description text
             *
             * Takes the product description text and trims it on to two lines
             */
            function trimText(txtElmWidth, txt, lines){
                var $ruler = $('<div id="ruler">').appendTo('#wrapper');
                var trimmed = "";
                var num;
                var rulerWidth;
                
                (function ints(txtElmWidth, txt){
                    num = 0;
                    rulerWidth = $ruler.text('').innerWidth();
                    
                    while (rulerWidth < txtElmWidth) {
                        trimmed = txt.substring(0, num);
                        $ruler.text(trimmed + '...');
                        num++;
                        rulerWidth = $ruler.innerWidth();
                        
                        if (num >= txt.length) {
                            // No truncation required.
                            $ruler.remove();
                            return txt;
                        }
                    }
                    
                    if (lines > 1) {
                        lines--;
                        _num = num;
                        ints(txtElmWidth, txt.substring(num, txt.length));
                    }
                })(txtElmWidth, txt);
                
                num += _num;
                
                if (txt.indexOf(' ') != -1) {
                    while (txt.charCodeAt(num) !== 32) {
                        num--;
                    }
                }
                
                $ruler.remove();
                _num = 0;
                return txt.substring(0, num) + '...';
            }
            
            
            
            /*
             * This displays the larger product info box
             *
             * @param {Object} $elm  : area element which recieved the click event
             * @param {boolean} show : show or hide the product box
             */
            function displayProductMoreInfoTip($elm, show){
                var alt;
                var split;
                var $productInfo;
                var position;
                var width = 0;
                var minWidth = 170;// min width of the content area
                var $desc;
                var pos;
                var trimmed;
                
                
                try {
                    if (show) {
                        bindProductContainer($elm, true); //bind onclick event to productContainer 
                        //displayProductInfoTip(false); 
                        $areas.unbind('.productSpread'); //stop all event functionality
                        $elm.addClass('click-active'); //changes cursor to default for active area map
                        $productContainer.addClass('click-active');
                        
                        //get the product information id
                        split = $elm.attr('class').split(' ');
                        alt = (split.length > 0) ? split[0] : $elm.attr('class')
                        $productInfo = $(alt.replace(/pid/g, '#uid')); //get product info of same id
                        //fill the content of the info box
                        $desc = $productInfo.find('.desc');
                        $productMoreInfoTip.find('.content').empty().html($productInfo.find('.content').html());
                        $productMoreInfoTip.find('li.more-info a').attr('href', $productInfo.find('.more-info').text());
                        $productMoreInfoTip.find('li.buy a').attr('href', $productInfo.find('.buy').text());
                        
                        //position[4] dictaes the right or left position of the element
                        position = $elm.attr('href').split(':');
                        $productMoreInfoTip.removeClass('left').removeClass('right').addClass(position[4]).css({
                            'visibility': 'hidden'
                        }).show();
                        
                        
                        width = $productMoreInfoTip.find('.title').width();
                        if (width < minWidth) {
                            width = minWidth;
                        }
                        
                        trimmed = trimText(width - 10, $desc.text(), 2);
                        $productMoreInfoTip.find('.desc').width(width + 15).text(trimmed);
                        
                        pos = readCoords($elm, position, $productMoreInfoTip);
                        
                        $productMoreInfoTip.css({
                            'visibility': 'visible',
                            top: pos.posY,
                            left: pos.posX,
                            'z-index': 20
                        });
                        if ($('#user-message').css('display') == 'block') 
                            setupUserMessage(true); //hides the user message if displayed
                    }
                    else {
                        bindProductContainer($elm, false);
                        hightlightRemove(); //clear any highlighted product
                        areaMapBindings(); //set up the image map binding which were removed when user clicked on product
                        $productMoreInfoTip.hide().stop(true, true);
                        $areas.removeClass('click-active');
                        $productContainer.removeClass('click-active');
                    }
                } 
                catch (e) {
                    //console.log(e);
                }
            }
            
            //call the binding functions
            areaMapBindings();
            productMoreInfoBindings();
        }
    }
    
    
})(jQuery, this, this.document);

