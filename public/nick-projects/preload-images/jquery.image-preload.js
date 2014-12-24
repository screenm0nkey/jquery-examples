//Image Preloader written by Nick Lowman http://www.nicklowman.co.uk

(function($, window, document, undefined){

    $.preloadImages = function(options, callback, callbackAfter){
        //default options
        var options = $.extend(true, {}, $.preloadImages.defaultOptions, options || {});
        
        if (options.ajax) {
            var ajaxObj = {
                type: "GET",
                url: options.xmlPath,
                dataType: "xml",
                cache: false,
                success: ajaxSuccess,
                error: function(e, xhr, settings, exception){
                    console.log(e);
                }
            }
            //get XML file
            $.ajax(ajaxObj);
        }
        else {
            start(options.imagePathArray);
        }
        
        //AJAX SUCCESS
        function ajaxSuccess(xml){
            $(xml).find(options.xmlTag).each(function(){
                options.imagePathArray.push(this.textContent);
            });
            start(options.imagePathArray);
        }
        
		
        //THE MAIN FUNCTION
        function start(imagePathArray){
            var imagesArray = [], 
				pathErrors = [], 
				count = 0;

            function loadImages(path){
                $('<img>', {
                    'src': options.imagePath + path,
					width: options.width,
                    load: function(){
                        imagesArray.push(this);
                        //invoke callback function if user supplies a call back after
                        if (imagesArray.length === options.callBackCount && $.isFunction(callbackAfter)) {
                            callbackAfter.call(this, imagesArray, pathErrors);
                        }
                        count++;
                        //if imagePathArray[count] equals undefined and the callback function hasn't been called, invoke it
                        imagePathArray[count] ? loadImages(imagePathArray[count]) : loadingComplete(imagesArray, pathErrors);
                    },
                    error: function(){
                        pathErrors.push(path);
                        count++;
                        imagePathArray[count] ? loadImages(imagePathArray[count]) : loadingComplete(imagesArray, pathErrors);
                    }
                });
            }
            
            //start loading of images
            imagePathArray.count !== 0 && loadImages(imagePathArray[count]);
            
            //LOADING COMPLETE - if loading is complete invoke the callback function
            function loadingComplete(imagesArray, pathErrors){
                jQuery.isFunction(callback) && callback.call(this, imagesArray, pathErrors);
            }
        }
    };
    
    
    //DEFAULT OPTIONS
    $.preloadImages.defaultOptions = {
        ajax: false,
        xmlPath: '',
        xmlTag: 'url',//this is the tag which will contain your paths i.e. <url>
        callBackCount: 0,
        imagePathArray: [],
        imagePath: '', //path to images
        width:'' //image width (if you need to set it from some reason
    };
    
    
})(jQuery, this, this.document);
