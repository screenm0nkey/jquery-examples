jQuery.extend(jQuery.easing, { 
  'linear': function(fraction, elapsed, attrStart, attrDelta, duration) {
    return fraction * attrDelta + attrStart;
  },
  'back-n-forth': function(fraction, elapsed, attrStart, attrDelta, duration) {
    if (fraction < 0.33)
      return fraction * (1.0 / 0.33) * attrDelta + attrStart;
    if (fraction < 0.66)
      return (-fraction + 0.66) * (1.0 / 0.33) * attrDelta + attrStart;
    return (fraction - 0.66) * (1.0 / 0.34) * attrDelta + attrStart;
  }
});
