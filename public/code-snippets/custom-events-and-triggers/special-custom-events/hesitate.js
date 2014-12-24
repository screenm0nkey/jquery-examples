(function($) {

  var prepareHesitate = function(event) {
    var $target = $(this);
    $target.data("hesitate.timer", setTimeout( function() {
      removeHesitate(event);
      $target.triggerHandler("hesitate");
    }, $.event.special.hesitate.duration));
  };
  
  var removeHesitate = function(event) {
    removeHesitateTimer($(this));
  }
  
  var removeHesitateTimer = function(target) {
    clearTimeout(target.data("hesitate.timer"));
    target.removeData("hesitate.timer");
  }
  
  $.event.special.hesitate = {
    setup: function(eventData, namespaces) {
      $(this).bind("mouseenter", prepareHesitate)
      .bind("mouseleave", removeHesitate)
      .bind("click", removeHesitate);

      // Return void as we don't want jQuery to use the native event binding on this element.
      return;
    },
    teardown: function(namespaces) {
      var $target = $(this);
      $target.unbind("mouseenter", prepareHesitate) //mouseenter and mouseleave are special events built into jQuery
      .unbind("mouseleave", removeHesitate)
      .unbind("click", removeHesitate);

      removeHesitateTimer($target);

      // Return void as we don't want jQuery to use the native event binding on this element.
      return;
    },
    duration: 2000
  };
})(jQuery);