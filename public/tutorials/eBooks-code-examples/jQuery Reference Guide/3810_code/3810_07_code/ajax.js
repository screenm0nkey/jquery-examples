$(document).ready(function() {
  $('#example-ajax-ajax .trigger').click(function() {
    $.ajax({
      url: 'ajax/test.html',
      success: function(data) {
        $('#example-ajax-ajax .result').html(data);
        $('#example-ajax-ajax').log('Load was performed.');
      },
    });
  });
});

$(document).ready(function() {
  $('#example-ajax-get .trigger').click(function() {
    $.get('ajax/test.html', function(data) {
      $('#example-ajax-get .result').html(data);
      $('#example-ajax-get').log('Load was performed.');
    });
  });
});

$(document).ready(function() {
  $('#example-ajax-getifmodified .trigger').click(function() {
    $.getIfModified('ajax/test.html', function(data) {
      if (data) {
        $('#example-ajax-getifmodified .result').html(data);
      }
      $('#example-ajax-getifmodified').log('Load was performed.');
    });
  });
});

$(document).ready(function() {
  $('#example-ajax-load .trigger').click(function() {
    $('#example-ajax-load .result').load('ajax/test.html', function() {
      $(this).log('Load was performed.');
    });
  });
});

$(document).ready(function() {
  $('#example-ajax-loadifmodified .trigger').click(function() {
    $('#example-ajax-loadifmodified .result').loadIfModified('ajax/test.html', function() {
      $(this).log('Load was performed.');
    });
  });
});

$(document).ready(function() {
  $('#example-ajax-getjson .trigger').click(function() {
    $.getJSON('ajax/test.json', function(data) {
      $('#example-ajax-getjson .result').html('<p>' + data.foo + '</p><p>' + data.baz[1] + '</p>');
      $('#example-ajax-getjson').log('Load was performed.');
    });
  });
});

$(document).ready(function() {
  $('#example-ajax-getscript .trigger').click(function() {
    $.getScript('ajax/test.js', function() {
      $('#example-ajax-getscript').log('Load was performed.');
    });
  });
});

$(document).ready(function() {
  $('#example-ajax-post .trigger').click(function() {
    $.post('ajax/test.html', function(data) {
      $('#example-ajax-post .result').html(data);
      $('#example-ajax-post').log('Load was performed.');
    });
  });
});


$(document).ready(function() {
  $('#example-ajax-ajaxcomplete').ajaxComplete(function() {
    $(this).log('Triggered ajaxComplete handler.');
  });
  $('#example-ajax-ajaxcomplete .log').ajaxComplete(function(e, xhr, settings) {
    if (settings.url == 'ajax/test.html') {
      $(this).log('Triggered ajaxComplete handler for "ajax/test.html".');
    }
  });
  $('#example-ajax-ajaxcomplete .trigger').click(function() {
    $('#example-ajax-ajaxcomplete .result').load('ajax/test.html');
  });
});

$(document).ready(function() {
  $('#example-ajax-ajaxerror').ajaxError(function() {
    $(this).log('Triggered ajaxError handler.');
  });
  $('#example-ajax-ajaxerror .trigger').click(function() {
    $('#example-ajax-ajaxerror .result').load('ajax/missing.html');
  });
});

$(document).ready(function() {
  $('#example-ajax-ajaxsend').ajaxSend(function() {
    $(this).log('Triggered ajaxSend handler.');
  });
  $('#example-ajax-ajaxsend .trigger').click(function() {
    $('#example-ajax-ajaxsend .result').load('ajax/test.html');
  });
});

$(document).ready(function() {
  $('#example-ajax-ajaxstart').ajaxStart(function() {
    $(this).log('Triggered ajaxStart handler.');
  });
  $('#example-ajax-ajaxstart .trigger').click(function() {
    $('#example-ajax-ajaxstart .result').load('ajax/test.html');
  });
});

$(document).ready(function() {
  $('#example-ajax-ajaxstop').ajaxStop(function() {
    $(this).log('Triggered ajaxStop handler.');
  });
  $('#example-ajax-ajaxstop .trigger').click(function() {
    $('#example-ajax-ajaxstop .result').load('ajax/test.html');
  });
});

$(document).ready(function() {
  $('#example-ajax-ajaxsuccess').ajaxSuccess(function() {
    $(this).log('Triggered ajaxSuccess handler.');
  });
  $('#example-ajax-ajaxsuccess .trigger').click(function() {
    $('#example-ajax-ajaxsuccess .result').load('ajax/test.html');
  });
});


$(document).ready(function() {
  $('#example-ajax-serialize form').submit(function() {
    $(this).log($('#example-ajax-serialize input, #example-ajax-serialize textarea, #example-ajax-serialize select').serialize());
    return false;
  });
});

