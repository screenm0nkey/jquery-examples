jQuery.fn.slideFadeOut = function(speed, callback) {
  return this.animate({height: 'hide', opacity: 'hide'}, speed, callback);
};

jQuery.fn.slideFadeIn = function(speed, callback) {
  return this.animate({height: 'show', opacity: 'show'}, speed, callback);
};

jQuery.fn.slideFadeToggle = function(speed, callback) {
  return this.animate({height: 'toggle', opacity: 'toggle'}, speed, easing, callback);  
};