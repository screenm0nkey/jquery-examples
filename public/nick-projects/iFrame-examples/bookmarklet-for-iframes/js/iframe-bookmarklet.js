
/* 
 * Created by: Nick Lowman
 * Last edited: 26/10/2010
 */
insertStyleSheet('css/main.css', 'css/IE6.css');


if (typeof jQuery === 'undefined') {
    loadjQuery(startIFrameLoad);
}
else {
    startIFrameLoad();
}



function loadjQuery(callback){
    var jQ = document.createElement('script');
    jQ.type = 'text/javascript';
    jQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(jQ);
    //The JQ.onload method doesn't work in IE6 & 7 so I'm using this self-invoking function expression. Much better way of doing it.
    (function checkLoaded(){
        try {
            //if jQuery wasn't already loaded then there's a chance the page might be using 
            //another library, so we need to return $ back to it's original owner just in case.
            if (jQuery) {
                jQuery.noConflict();
                callback.call(this, 'jq-loaded');
            }
        } 
        catch (e) {
            setTimeout(checkLoaded, 100);
        }
    })();
}


function insertStyleSheet(mainCSS, ie6CSS){
    //check to make sure it isn't already inserted
    if (!document.getElementById('iframe-style')) {
        console.log('insert');
        var headID = document.getElementsByTagName("head")[0];
        var cssNode = document.createElement('link');
        cssNode.id = 'iframe-style';
        cssNode.type = 'text/css';
        cssNode.rel = 'stylesheet';
        cssNode.href = mainCSS;
        cssNode.media = 'screen';
        headID.appendChild(cssNode);
        
		//if IE6 insert alternate stylesheet
        if (navigator.userAgent.indexOf('MSIE 6.0') !== -1) {
            cssNode = document.createElement('link');
            cssNode.type = 'text/css';
            cssNode.rel = 'stylesheet';
            cssNode.href = ie6CSS;
            cssNode.media = 'screen';
            headID.appendChild(cssNode);
        }
    } 
}


function startIFrameLoad(loaded){
    //main function
    (function($, window, document, undefined){
        var $iFrameBG, 
			$iFrameWrapper,
			$iFrameParent,
			$window;
        
        //div into which we'll load the html which contains the parent iFrame. Could have put the html from this page in the code but it looks messy.
        $iFrameWrapper = $('<div>').attr('id', 'iframe-wrapper').appendTo('body').hide();
        $iFrameWrapper.bind({
            'REMOVE': function(){
                $(this).remove();
            }
        });
		
		
		//Insert Parent iFrame into DOM and then load child page which also contains an iFrame
		$iFrameParent = $('<iframe id="iframe-parent" frameborder="0" border="0" cellspacing="0" vspace="0" hspace="0" scrolling="no"></iframe>').prependTo($iFrameWrapper);
		$iFrameParent.bind({
			'load':function(){
				$iFrameWrapper.fadeIn(1000);
			}
		}).attr('src','iframe-child.html?id=12');
        
        
        //iFrame black background	        
        $iFrameBG = $('<div>').attr('id', 'iframe-bg').prependTo('body').bind({
            'click': function(evt){
                $.event.trigger('REMOVE');//trigger global event
            },
            'REMOVE': function(evt){
                $(this).remove();
            }
        });
		
		
		//if IE6
		if (navigator.userAgent.indexOf('MSIE 6.0') !== -1){
			$window = $(window);
			$iFrameBG.height($window.height()+'px');
			$iFrameBG.width($window.width()+'px');
		}
    })(jQuery, this, this.document);
}



