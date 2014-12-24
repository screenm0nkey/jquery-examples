Array.prototype._contains = function(item){
    for (var i = 0; i < this.length; i += 1) {
        if (this[i] === item) {
            return true;
        }
    }
    return false;
};

Array.prototype._distinct = function(){
    var derivedArray = [];
    for (var i = 0; i < this.length; i += 1) {
        if (!derivedArray._contains(this[i])) {
            derivedArray.push(this[i])
        }
    }
    return derivedArray;
};

Array.prototype._indexOf = function(x){
    var f = -1;
    for (var i = 0; i < this.length; i += 1) {
        if (x === this[i]) {
            f = i;
        }
    }
    return f;
};



(function($){

    var MenuSlider = function(el, widthsArr, options, setParentWidth){
        //this = the empty object which is returned when a function contructor is invoked
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("formatLink", base);
        base.width = '';
        base.title = base.$el.text();
        base.pos = Number(base.$el.attr('rel'));
        
        
        base.setWidth = function(){
            var i = widthsArr._indexOf(base.pos);
            base.width = (widthsArr[i + 1]) ? (widthsArr[i + 1] - base.pos) + 'px' : (base.options.imageWidth - base.pos) + 'px';
            base.$el.width(base.width);
            base.$el.css({
                backgroundPosition: base.on
            });
            base.$el.removeAttr('rel');
            setParentWidth(base.width);
        }
        
        
        //init function
		(function(){
            base.options = $.extend({}, MenuSlider.defaultOptions, options);
            base.on = '-' + base.pos + 'px 0px';
            base.onOrig = '-' + base.pos + 'px 0px';
            base.off = '-' + base.pos + 'px -' + base.options.spriteHeight + 'px';
            base.offOrig = '-' + base.pos + 'px -' + base.options.spriteHeight + 'px';
            base.click = '-' + base.pos + 'px -' + (base.options.spriteHeight * 2) + 'px';
            base.setWidth();
            
            base.$el.hover(function(){
                base.$el.css({
                    backgroundPosition: base.off
                });
            }, function(){
                base.$el.css({
                    backgroundPosition: base.on
                });
            });
            
            base.$el.mousedown(function(){
                if (base.options.click) {
                    base.on = base.off = base.click;
                    base.$el.css({
                        backgroundPosition: base.click
                    });
                }
            });
            
            base.resetClick = function(){
                if (base.options.click) {
                    base.on = base.onOrig;
                    base.off = base.offOrig;
                    base.$el.css({
                        backgroundPosition: base.on
                    });
                }
            }
        })();
   
    };
    
    MenuSlider.defaultOptions = {
        bgImage: '',
        imageWidth: 0,
        spriteHeight: 0,
        click: false
    };
    
    
    
    $.fn.menuSlider = function(options){
        var widthsArr = [];
        var totalWidth = 0;
        var widestElm = 0;
        
        return this.each(function(){
            $(this).wrap('<div id="jqMenuSliderWrap">');
            $('li a', this).css("background-image", 'url(' + options.bgImage + ')');
            $('a', this).wrapInner('<span>');
            $("li", this).add($("li a span", this)).css({
                height: options.spriteHeight+'px',
                'line-height': options.spriteHeight+'px'
            });
            $("li ul", this).css({
                top: options.spriteHeight+'px'
            });
            
            
            $('a[rel]', this).each(function(){
                widthsArr.push(Number($(this).attr('rel')));
            });
            
            //sorts array numerically
            function mysort(a, b){
                return (a - b);
            }
            
            widthsArr = widthsArr._distinct();
            widthsArr = widthsArr.sort(mysort);
            
            //animate the div up and down
            $(">li>a", this).click(function(){
                $(this).siblings('ul').slideDown().show();
                $(this).parent().hover(function(){
                }, function(){
                    $('>ul', this).slideUp('fast');
                    $('>a', this).add($('>ul li a', this)).each(function(){
                        $(this).data('formatLink').resetClick();
                    });
                });
                return false;
            })
            
            //add data objects to menu items
            $(">li>a", this).add($('>li>ul>li a', this)).each(function(){
                (new MenuSlider(this, widthsArr, options, setParentWidth));
            });
            
            //fix for IE7 - Set the width of the dropdown list
            function setParentWidth(s){
                if (Number(s.replace(/\D+/mg, "")) > widestElm) {
                    widestElm = Number(s.replace(/\D+/mg, ""));
                }
            }
            $('li>ul', this).css({
                width: widestElm + 'px'
            })
			$(this).css({display:'block'});
        });
    };
    
})(jQuery)
