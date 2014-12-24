jQuery.extend(jQuery.easing, { 
  'quadratic': function(fraction, elapsed, attrStart, attrDelta,
                                                       duration) {
    return fraction * fraction * attrDelta + attrStart;
  }
});
