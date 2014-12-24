jQuery(document).ready(function($) {
  $('#example-events-ready').log('Ready event was triggered.');
});

$(document).ready(function() {
  $('#example-events-load .target').load(function() {
    $(this).log('Load event was triggered.');
  });
});

$(document).ready(function() {
  $(window).unload(function() {
    alert('Unload event was triggered.');
  });
});

$(document).ready(function() {
  $('#example-events-error .target').error(function() {
    $(this).log('Error event was triggered.');
  });
});

$(document).ready(function() {
  $('#example-events-mousedown .target').mousedown(function(event) {
    $(this).log('Mousedown event was triggered. Event.which is ' + event.which + '. Event.button is ' + event.button + '.');
  });

  $('#example-events-mousedown .trigger').click(function() {
    $('#example-events-mousedown .target').mousedown();
  });
});

$(document).ready(function() {
  $('#example-events-mouseup .target').mouseup(function(event) {
    $(this).log('Mouseup event was triggered. Event.which is ' + event.which + '. Event.button is ' + event.button + '.');
  });

  $('#example-events-mouseup .trigger').click(function() {
    $('#example-events-mouseup .target').mouseup();
  });
});

$(document).ready(function() {
  $('#example-events-click .target').click(function(event) {
    $(this).log('Click event was triggered. Event.which is ' + event.which + '. Event.button is ' + event.button + '.');
  });

  $('#example-events-click .trigger').click(function() {
    $('#example-events-click .target').click();
  });
});

$(document).ready(function() {
  $('#example-events-dblclick .target').dblclick(function(event) {
    $(this).log('Dblclick event was triggered. Event.which is ' + event.which + '. Event.button is ' + event.button + '.');
  });

  $('#example-events-dblclick .trigger').click(function() {
    $('#example-events-dblclick .target').dblclick();
  });
});

$(document).ready(function() {
  $('#example-events-toggle .target').toggle(function() {
    $(this).log('Toggle event was triggered (handler 1).');
  }, function() {
    $(this).log('Toggle event was triggered (handler 2).');
  });
});

$(document).ready(function() {
  $('#example-events-mouseover .target').mouseover(function(event) {
    $(this).log('Mouseover event was triggered.');
  });

  $('#example-events-mouseover .trigger').click(function() {
    $('#example-events-mouseover .target').mouseover();
  });
});

$(document).ready(function() {
  $('#example-events-mouseout .target').mouseout(function(event) {
    $(this).log('Mouseout event was triggered.');
  });

  $('#example-events-mouseout .trigger').click(function() {
    $('#example-events-mouseout .target').mouseout();
  });
});

$(document).ready(function() {
  $('#example-events-hover .target').hover(function() {
    $(this).log('Hover event was triggered (entering).');
  }, function() {
    $(this).log('Hover event was triggered (leaving).');
  });
});

$(document).ready(function() {
  $('#example-events-mousemove .target').mousemove(function(event) {
    $(this).log('Mousemove event was triggered. Event.pageX is ' + event.pageX + '. Event.pageY is ' + event.pageY + '.');
  });

  $('#example-events-mousemove .trigger').click(function() {
    $('#example-events-mousemove .target').mousemove();
  });
});

$(document).ready(function() {
  $('#example-events-focus .target').focus(function() {
    $(this).log('Focus event was triggered.');
  });

  $('#example-events-focus .trigger').click(function() {
    $('#example-events-focus .target').focus();
  });
});

$(document).ready(function() {
  $('#example-events-blur .target').blur(function() {
    $(this).log('Blur event was triggered.');
  });

  $('#example-events-blur .trigger').click(function() {
    $('#example-events-blur .target').blur();
  });
});

$(document).ready(function() {
  $('#example-events-change .target').change(function() {
    $(this).log('Change event was triggered.');
  });

  $('#example-events-change .trigger').click(function() {
    $('#example-events-change .target').change();
  });
});

$(document).ready(function() {
  $('#example-events-select .target').select(function() {
    $(this).log('Select event was triggered.');
  });

  $('#example-events-select .trigger').click(function() {
    $('#example-events-select .target').select();
  });
});

$(document).ready(function() {
  $('#example-events-submit .target').submit(function() {
    $(this).log('Submit event was triggered.');
  });

  $('#example-events-submit .trigger').click(function() {
    $('#example-events-submit .target').submit();
  });
});

$(document).ready(function() {
  $('#example-events-keydown .target').keydown(function(event) {
    $(this).log('Keydown event was triggered. Event.which is ' + event.which + '. Event.keyCode is ' + event.keyCode + '.');
  });

  $('#example-events-keydown .trigger').click(function() {
    $('#example-events-keydown .target').keydown();
  });
});

$(document).ready(function() {
  $('#example-events-keypress .target').keypress(function(event) {
    $(this).log('Keypress event was triggered. Event.which is ' + event.which + '. Event.keyCode is ' + event.keyCode + '.');
  });

  $('#example-events-keypress .trigger').click(function() {
    $('#example-events-keypress .target').keypress();
  });
});

$(document).ready(function() {
  $('#example-events-keyup .target').keyup(function(event) {
    $(this).log('Keyup event was triggered. Event.which is ' + event.which + '. Event.keyCode is ' + event.keyCode + '.');
  });

  $('#example-events-keyup .trigger').click(function() {
    $('#example-events-keyup .target').keyup();
  });
});

$(document).ready(function() {
  $(window).resize(function(event) {
    $('#example-events-resize').log('Resize event was triggered.');
  });

  $('#example-events-resize .trigger').click(function() {
    $('#example-events-resize .target').resize();
  });
});

$(document).ready(function() {
  $('#example-events-scroll .target').scroll(function(event) {
    $(this).log('Scroll event was triggered.');
  });

  $('#example-events-scroll .trigger').click(function() {
    $('#example-events-scroll .target').scroll();
  });
});
