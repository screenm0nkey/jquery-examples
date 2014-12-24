

(function($, window, document, undefined) {

  $.fn.imageHover = function(options) {

    var opts = $.extend({}, $.fn.imageHover.defaultOptions, options || {});
    //private properties
    var priv = {
      timer01 : 0,
      nodeName : 'IMG'
    };

    return $(this).each( function() {
      new imageHover(this, opts, priv);
    });
  };

  //public options
  $.fn.imageHover.defaultOptions = {};

  //
  var imageHover = function imageHover(elm, opts, priv) {
    var self = this;

    self.$elm = $(elm);
    self.elm = elm;
    self.opts = opts;
    self.$elm.data("imageHover", self);

    //init function.
    self._create = function() {
      opts.$box = $(opts.$box);
      self.$elm.bind({
        'mouseover' : mouseOverEl
      });
    };
    self._create();


    function mouseOverEl (evt) {
      var $target = $(evt.target);

      if (evt.target === self.elm) {
        hide();
      } else
      if (evt.target.nodeName === priv.nodeName && $target.closest(opts.linkClass)[0]) {
        show($target);
      }
    }

    function show ($target) {
      hide($target);
      console.log('show');

      priv.timer01 = setTimeout( function() {
        console.log('showing');
        opts.$box
            .css({
              top : $target.offset().top,
              left : $target.offset().left
            })
            .fadeIn(200);
      }, opts.showDelay);
    }

    function hide () {
      console.log('hide');
      if(priv.timer01) {
        clearTimeout(priv.timer01);
        opts.$box.hide();
      }
    }
  };



})(jQuery, window, document);