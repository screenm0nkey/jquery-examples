/* 
 * Created by: Nick Lowman
 * Last edited: 26/10/2010
 */
(function($, window, document, undefined){
    var urlObject = {}; //stores a list of the urls and scroll positions
    var currentUrl = '';
    
    jQuery.ajaxSetup({
        cache: false,
        dataType: 'html',
        type: 'GET'
    });
    
    
    function getPage(url, $elm, addNavClass){
        urlObject[currentUrl] = $elm.scrollTop();
        
        $.ajax({
            url: url,
            success: function(data, textStatus, XMLHttpRequest){
                $elm.hide().html(data).fadeIn(500);
                addNavClass(url);//mark nav item as active
                $elm.scrollTop(urlObject[url] || 0); 
                currentUrl = url;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
            }
        });
    }
    
    //gets dom element based on ID. If it doesn't exists it looks at the parent DOM.
    function get(id){
        return (document.getElementById(id)) ? $(document.getElementById(id)) : $(window.parent.document.getElementById(id));
    }
    
    
    /*
     *
     */
    $.configureIFrame = function(options){
        var $parentiFrame = get(options.iFrameParentId); //id of the parent iFrame
        var $mainContent = get(options.mainContentId);
        var $header = get(options.headerId);
        var $navigation = get(options.navigationId);
        var $navigationLinks;
        
        //init function
        (function(){
            getPage(options.initialPage, $mainContent, addNavClass);//load the initial content
            $navigationLinks = $navigation.find('a');
            
            if (navigator.userAgent.indexOf('MSIE 6.0') !== -1) {
                var $window = $(window.parent);
                (function nick(){
                    ($window.height() === 0) ? setTimeout(nick, 100) : $parentiFrame.height(($window.height()/100)*80 + 'px');
                })();
            }
        })();
        
        
        //adds an active class to the currently active link
        function addNavClass(href){
            $navigationLinks.each(function(){
                $this = $(this);
                $this.removeClass('active');
                $this.attr('href') === href && $this.addClass('active');
            });
        }
        
        //Give the main content DIV a height unless the scrollbar wont appear and any overflow content will be hidden
        function resizeMainContent(){
            try {
                var height = $parentiFrame.height() - $header.outerHeight() + 'px';
                $mainContent.height(height);
            } 
            catch (e) {
            }
        }
        
        //It seems most browers except IE8 call the resize event when the window finishes loading, hense the load function
        $(window).bind({
            'resize': function(){
                resizeMainContent();
            },
            'load': function load(){
                //check to make sure you can get a height value as IE8 kept returning 0 even when the DOM had finished loading
                //something to do with it being in an iFrame as it worked fine as a stand-alone page
                ($parentiFrame.height() === 0) ? setTimeout(load, 100) : resizeMainContent();
            }
        });
        
        
        $navigation.bind({
            'click': function(evt){
                $link = $(evt.target).closest('a');
                if ($link.length) {
                    getPage($link.attr('href'), $mainContent, addNavClass);
                }
                evt.preventDefault();
            }
        });
    };
    
})(jQuery, this, this.document);
