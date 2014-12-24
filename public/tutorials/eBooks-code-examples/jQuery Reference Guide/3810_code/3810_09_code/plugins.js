
/***************************
 Selector Expressions
***************************/
$(document).ready(function() {
  $('ul:num-children(2)').css('color', 'red');
});



/***************************
 Easing Styles
***************************/
$(document).ready(function() {
  $('#easing-plugin .trigger').toggle(function() {
    $('#easing-plugin .default .sprite').animate({'left': 791, 'opacity': 0.1}, 5000);
    $('#easing-plugin .linear .sprite').animate({'left': 791, 'opacity': 0.1}, 5000, 'linear');
    $('#easing-plugin .quadratic .sprite').animate({'left': 791, 'opacity': 0.1}, 5000, 'quadratic');
  }, function() {
    $('#easing-plugin .default .sprite').animate({'left': 1, 'opacity': 1.0}, 5000);
    $('#easing-plugin .linear .sprite').animate({'left': 1, 'opacity': 1.0}, 5000, 'linear');
    $('#easing-plugin .quadratic .sprite').animate({'left': 1, 'opacity': 1.0}, 5000, 'quadratic');
  });
});

/***************************
 Message Logging
***************************/
$(document).ready(function() {
  $('#log-plugin .trigger').click(function() {
    $(this).log('Thanks for clicking the button!');
  });
});
