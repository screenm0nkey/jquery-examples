$(document).ready(function() {
  $('#example-effects-show .target').hide();

  $('#example-effects-show .trigger').click(function() {
    $('#example-effects-show .target').show('slow', function() {
      $(this).log('Effect complete.');
    });
  });
});

$(document).ready(function() {
  $('#example-effects-hide .trigger').click(function() {
    $('#example-effects-hide .target').hide('slow', function() {
      $(this).log('Effect complete.');
    });
  });
});

$(document).ready(function() {
  $('#example-effects-toggle .trigger').click(function() {
    $('#example-effects-toggle .target').toggle('slow', function() {
      $(this).log('Effect complete.');
    });
  });
});

$(document).ready(function() {
  $('#example-effects-slidedown .target').hide();

  $('#example-effects-slidedown .trigger').click(function() {
    $('#example-effects-slidedown .target').slideDown('slow', function() {
      $(this).log('Effect complete.');
    });
  });
});

$(document).ready(function() {
  $('#example-effects-slideup .trigger').click(function() {
    $('#example-effects-slideup .target').slideUp('slow', function() {
      $(this).log('Effect complete.');
    });
  });
});

$(document).ready(function() {
  $('#example-effects-slidetoggle .trigger').click(function() {
    $('#example-effects-slidetoggle .target').slideToggle('slow', function() {
      $(this).log('Effect complete.');
    });
  });
});

$(document).ready(function() {
  $('#example-effects-fadein .target').hide();

  $('#example-effects-fadein .trigger').click(function() {
    $('#example-effects-fadein .target').fadeIn('slow', function() {
      $(this).log('Effect complete.');
    });
  });
});

$(document).ready(function() {
  $('#example-effects-fadeout .trigger').click(function() {
    $('#example-effects-fadeout .target').fadeOut('slow', function() {
      $(this).log('Effect complete.');
    });
  });
});

$(document).ready(function() {
  $('#example-effects-fadeto .trigger').click(function() {
    $('#example-effects-fadeto .target').fadeTo('slow', 0.5, function() {
      $(this).log('Effect complete.');
    });
  });
});

$(document).ready(function() {
  $('#example-effects-animate .target').css({
    position: 'relative'
  });

  $('#example-effects-animate .trigger').click(function() {
    $('#example-effects-animate .target').animate({
      'width': 300,
      'left': 100,
      'opacity': 0.25
    }, 'slow', function() {
      $(this).log('Effect complete.');
    });
  });
});

