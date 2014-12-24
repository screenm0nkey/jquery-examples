(function($){

    $.titleBlock = {
        defaults: {
            removeTitle: true,
            thefontSize: "20px"
        }
    }
    
    $.fn.extend({
        titleBlock: function(config){
            var config = $.extend({}, $.titleBlock.defaults, config);
            console.log(this);
			//'this' represents a jquery array of returned dom elements
            return this.each(function(){
                var theImage = $(this), removeTitle = config.removeTitle, theFontSizeValue = config.thefontSize;
                
                theImage.wrap("<div class='image'>")
				.parent()
				.append("<h2>&nbsp;</h2>")
				.find("h2")
				.html(theImage.attr('title'))
				.wrapInner("<span style='font-size:" + theFontSizeValue + "px;'></span>")
				.find("br")
				.before("<span class='spacer'>&nbsp;</span>")
				.after("<span class='spacer'>&nbsp;</span>");
                
                if (removeTitle) {
                    theImage.removeAttr("title");
                }  
            })  
        }
    })
    
    
})(jQuery);
