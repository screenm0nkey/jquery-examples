jQuery.fn.grandparent = function() {
  var grandparents = [];
  jQuery.each(this, function(index, value) {
    grandparents.push(value.parentNode.parentNode);
  });
  grandparents = $.unique(grandparents);
  return this.pushStack(grandparents);
};
