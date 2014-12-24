
(function($, window, document, undefined){

    $.fn.plugin = function(options){
        //if you don't supply the third empty object it will update the defaultOptions object as well as config
        var options = $.extend(true, {}, $.fn.simpleSlider.defaultOptions, options || {});
        
        return this.each(function(){
            var $this = $(this);
            
            $this.bind({
                'CUSTOM-EVENT1': function(){},
                'CUSTOM-EVENT2': function(){}
            });
        });
    };
    
    $.fn.simpleSlider.defaultOptions = {
        leftNav: '#left',
        rightNav: '#right',
        panelClass: 'slider-panel'
    }
})(jQuery, this, this.document);
