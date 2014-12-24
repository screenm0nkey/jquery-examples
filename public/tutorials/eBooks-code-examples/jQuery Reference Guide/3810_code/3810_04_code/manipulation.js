/* -----------------------------------
   =GENERAL ATTRIBUTES
-------------------------------------- */
$(document).ready(function() {
  $('#example-manipulation-attr .trigger').click(function() {
    var boxClass = $(this).parents('div.example').find('div.demo-box').attr('class');
    $(this).log('Class attribute of <div class="demo-box"> is ' + boxClass);
  });
});

$(document).ready(function() {
  $('#example-manipulation-toggle-class .trigger').click(function() {
    var $demoBox = $(this).parents('div.example').find('div.demo-box');
    $demoBox.toggleClass('new-class');
    var boxClass = $demoBox.attr('class');
    $(this).log('Class attribute of <div class="demo-box"> is ' + boxClass);
  });
});

$(document).ready(function() {
  $('#example-manipulation-html .trigger').click(function() {
    var demoContents = $(this).parents('div.example').find('div.demo-container').html();
    $(this).log('The HTML content of <div class="demo-container"> is: ' + "\n" + demoContents);
  });
});

$(document).ready(function() {
  $('#example-manipulation-val .trigger').click(function() {
    var demoValue = $(this).parents('div.example').find('div.demo-container input').val();
    $(this).log('The value of the input field is is: ' + "\n" + demoValue);
  });
});

/* -----------------------------------
   =DOM INSERTION, INSIDE
-------------------------------------- */

$(document).ready(function() {
  $('#example-manipulation-prepend .trigger').click(function() {
    $('#example-manipulation-prepend div.demo-box').prepend('<div class="insertion">This text was <strong>inserted</strong></div>');
  });
});

$(document).ready(function() {
  $('#example-manipulation-prepend-to .trigger').click(function() {
    $('<div class="insertion">This text was <strong>inserted</strong></div>').prependTo('#example-manipulation-prepend-to div.demo-box');
  });
});

$(document).ready(function() {
  $('#example-manipulation-append .trigger').click(function() {
    $('#example-manipulation-append div.demo-box').append('<div class="insertion">This text was <strong>inserted</strong></div>');
  });
});

$(document).ready(function() {
  $('#example-manipulation-append-to .trigger').click(function() {
    $('<div class="insertion">This text was <strong>inserted</strong></div>').appendTo('#example-manipulation-append-to div.demo-box');
  });
});


/* -----------------------------------
   =DOM INSERTION, OUTSIDE
-------------------------------------- */

$(document).ready(function() {
  $('#example-manipulation-before .trigger').click(function() {
    $('#example-manipulation-before div.demo-box').before('<div class="insertion">This text was <strong>inserted</strong></div>');
  });
});

$(document).ready(function() {
  $('#example-manipulation-insert-before .trigger').click(function() {
    $('<div class="insertion">This text was <strong>inserted</strong></div>').insertBefore('#example-manipulation-insert-before div.demo-box');
  });
});

$(document).ready(function() {
  $('#example-manipulation-after .trigger').click(function() {
    $('#example-manipulation-after div.demo-box').after('<div class="insertion">This text was <strong>inserted</strong></div>');
  });
});

$(document).ready(function() {
  $('#example-manipulation-insert-after .trigger').click(function() {
    $('<div class="insertion">This text was <strong>inserted</strong></div>').insertAfter('#example-manipulation-insert-after div.demo-box');
  });
});


/* -----------------------------------
   =DOM INSERTION, OUTSIDE
-------------------------------------- */

$(document).ready(function() {
  $('#example-manipulation-wrap .trigger').click(function() {
    $('#example-manipulation-wrap div.demo-box').wrap('<div class="insertion"></div>');
  });
});

/* -----------------------------------
   =DOM COPYING
-------------------------------------- */

$(document).ready(function() {
  $('#example-manipulation-clone .trigger').bind('click',function() {
    $('#example-manipulation-clone div.demo-box:last').clone()
    .insertAfter('#example-manipulation-clone div.demo-box:last');
    
  });
});

$(document).ready(function() {
  $('#example-manipulation-clone-false .trigger').bind('click',function() {
    $('#example-manipulation-clone-false div.demo-box:last').clone(false)
    .insertAfter('#example-manipulation-clone-false div.demo-box:last');
    $('#example-manipulation-clone-false div.demo-box').append('<p>New Message</p>');
  });
});
/* -----------------------------------
   =DOM REMOVAL
-------------------------------------- */

$(document).ready(function() {
  $('#example-manipulation-empty .trigger').click(function() {
    $('#example-manipulation-empty div.demo-box').empty();
  });
});

$(document).ready(function() {
  $('#example-manipulation-remove .trigger').click(function() {
    $('#example-manipulation-remove div.demo-box').remove();
  });
});
