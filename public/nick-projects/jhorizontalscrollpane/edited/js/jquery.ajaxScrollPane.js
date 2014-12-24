/*
	Nick Lowman http://www.nicklowman.co.uk
*/

(function($, window, document, undefined){

    $.fn.configurejScroll = function(options){
        var options = $.extend(true, {}, $.fn.configurejScroll.defaultOptions, options || {});
        return this.each(function(){
            configurejScroll($(this), options);
        });
    }
    
    $.fn.configurejScroll.defaultOptions = {
        path: 'ajax/',
        fadeOut: 1000,
        scrollPane: '.scroll-pane',
        scrollLoader: '.scroll-loader',
        scrollNav: '.scroll-nav',
        scrollLink: '.scroll-startup-link',
        scrollLinkClass: 'active',
        errorMessage: "THERE'S BEEN AN AJAX ERROR",
        //The following are options for jScrollHorizonalPane
        scrollbarHeight: 10,
        scrollbarMargin: 0,
        scrollbarHeight: 15,
        dragMinWidth: 20,
        maintainPosition: false,
        reset: true
    }
    
 
 
    function configurejScroll($holder, options){
        var $scrollerPane = $holder.find(options.scrollPane), 
			$scrollLoader = $holder.find(options.scrollLoader),//AJAX Loader
 			$scrollNav = $holder.find(options.scrollNav), //Navigation
 			liWidth = $scrollerPane.find('ul>li:first').outerWidth(), 
			classArray = $scrollerPane.find('ul').attr('class').split(' '), //classed applied to scrollpane
 			currentHref, 
			ajaxError = false;
        
        //BIND the click events to the navigation item
        $scrollNav.bind('click', function(evt){
            var $link = $(evt.target).closest('a'), href = options.path + $link.attr('href');
            
            try {
                if (href !== currentHref) {//stop load if double click on same link
                    currentHref = href;
                    $scrollLoader.show();
                    
                    $.ajax({
                        type: "get",
                        url: href,
                        dataType: 'html',
                        cache: false,
                        success: function(data, status, XHR){
                            var $data = $(data);
                            //we'replacing the current ul list so we need to add the classes from the existing one
                            $.each(classArray, function(i, val){
                                $data.addClass(val);
                            });
                            
                            $data.width($data.find('li').length * liWidth);//set width
                            $scrollerPane.empty().append($data); //insert into DOM
                            //Start scroller
                            startjScroll($scrollerPane, options, function(){
                                $scrollLoader.fadeOut(options.fadeOut);
                            });
                            
							//add active link
                            $link.parent().addClass(options.scrollLinkClass).siblings().removeClass(options.scrollLinkClass);
                            
                            ajaxError = false;
                        },
                        error: function(XHR, status, errorThrown){
                            //Resort back to the first url supplied, as loader wouldn't have started if that was incorrect
                            if (!ajaxError) {
                                $holder.find(options.scrollLink).trigger('click');
                                ajaxError = true; //this stops ajax loop;
                                $scrollLoader.append('<p class="ajax-error">' + options.errorMessage + '</p>');
                            }
                        }
                    });
                    
                }
            } 
            catch (e) {
            }
            evt.preventDefault();
        });
        
        //Inital setup of the scrollpane options and trigger the click event on the link the user selected
        $holder.find(options.scrollLink).trigger('click');
    }
    
    /*
     * jScrollHorizontalPane setup function
     * The id of the $elm paramater should be the div containing the li elements, in this example #scroll-pane-01
     */
    function startjScroll($elm, options, callback){
        $elm.jScrollHorizontalPane(options);
        if (jQuery.isFunction(callback)) {
            callback.call(this, arguments);//callback function once jScrollHorizontalPane is finished
        }
    }
})(jQuery, this, this.document);
