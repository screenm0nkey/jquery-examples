(function($){

    $.ColorObserver = function(el, options){
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("ColorObserver", base);
        
        console.log('base ', base.$el);
        
        base.init = function(){
            base.options = $.extend({}, $.ColorObserver.defaultOptions, options);
            
            //console.log($(base.options.watchItems));
            $(base.options.watchItems).bind('COLOR_CHANGED', function(){
                base.discoverColors();
            });
            base.discoverColors();
        };
        
        
        base.discoverColors = function(){
            var colors_count = {};
            $(base.options.watchItems).each(function(){
                var color = $(this).data('ColorBlock').getColor();
                
                if (!colors_count[color]) {
                    colors_count[color] = 1;
                }
                else {
                    colors_count[color] += 1;
                }
            });
            
            var output = "";
            $.each(colors_count, function(key, value){
                output += key + "=" + value + "<br />";
            });
            base.$el.html(output);
        };
        base.init();
    };
    
    
    $.ColorObserver.defaultOptions = {
        watchItems: ""
    };
    
    
    $.fn.colorObserver = function(options){
        return this.each(function(){
            (new $.ColorObserver(this, options));
        });
    };
    
    
    $.fn.getColorObserver = function(){
        return this.data("ColorObserver");
    };
    
})(jQuery);
