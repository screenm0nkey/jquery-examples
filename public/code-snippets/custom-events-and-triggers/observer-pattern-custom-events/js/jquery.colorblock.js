(function($){

    //CONSTRUCTOR
    var ColorBlock = function(el, options){
        var base = this; //new empty object
        base.$el = $(el);
        base.el = el;
        base.$el.data("ColorBlock", base);
		
        
        base.setColor = function(new_color_index){
            if (new_color_index != base.current_color_index) {
                base.current_color_index = new_color_index;
                base.$el.css({
                    backgroundColor: base.options.colors[base.current_color_index]
                });
				console.log(1, base.$el);
                base.$el.trigger('COLOR_CHANGED');
            }
        };
        
        base.nextColor = function(){
            var new_color_index = base.current_color_index + 1;
            if (new_color_index > (base.options.colors.length - 1)) {
				new_color_index = 0;
			}
            base.setColor(new_color_index);
        };
        
        base.getColor = function(){
            return base.options.colors[base.current_color_index];
        };
        
        base.init = function(){
            base.options = $.extend({}, ColorBlock.defaultOptions, options);
            base.$el.click(function(){
                base.nextColor();
            });
            base.setColor(0);
        }();
    };
    
    
    ColorBlock.defaultOptions = {
        colors: ["red", "blue", "green", "yellow"]
    };
    
    
    $.fn.colorBlock = function(options){
        //console.log(arguments.callee, this)
        //you can just write 'return this' and jQuery chaining will work but but using this.each
        //allows us to target each element so we can change it in some way
        return this.each(function(){
            var obj = (new ColorBlock(this, options));
            //console.log(obj);
        });
    };
    
    
    $.fn.getColorBlock = function(){
        return this.data("ColorBlock");
    };
    
})(jQuery);
