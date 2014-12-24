jQuery.nthchild = function(element, components) {
  var index = $(element).parent().children().index(element) + 1;

  var numbers = components[3].match(/((\d+)n)?\+?(\d+)?/);
  
  if (numbers[2] == undefined) {
    return index == numbers[3];
  }
  if (numbers[3] == undefined) {
    numbers[3] = 0;
  }
  
  return (index - numbers[3]) % numbers[2] == 0;
};

jQuery.extend(jQuery.expr[':'], {
  'nth-child': 'jQuery.nthchild(a, m)'
});

