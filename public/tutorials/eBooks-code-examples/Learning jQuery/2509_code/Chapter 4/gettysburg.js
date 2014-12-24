$(document).ready(function() {
  $('p:eq(1)').hide();
  $('span.more').click(function() {
        $('p:eq(1)').animate({height: "show", width: "show", opacity:"show"}, 'slow');
    $(this).hide();
  });
});

$(document).ready(function() {
  $('div.button').click(function() {
    var $speech = $('div.speech');
    var currentSize = $speech.css('fontSize');
    var num = parseFloat( currentSize, 10 );
    var unit = currentSize.slice(-2);
    if (this.id == 'switcher-large') {
      num *= 1.4;
    } else if (this.id == 'switcher-small') {
      num /= 1.4;
    }
    $speech.css('fontSize', num + unit);
  });
});

$(document).ready(function() {
  $('div.label').click(function() {
    var paraWidth = $('div.speech p').width();
    var $button = $('div.button');
    var buttonWidth = $button.width();
    var paddingRight = $button.css('paddingRight');
    var paddingLeft = $button.css('paddingLeft');
    var borderRightWidth = $button.css('borderRightWidth');
    var borderLeftWidth = $button.css('borderLeftWidth');
    var totalButtonWidth = parseInt(buttonWidth, 10) + parseInt(paddingRight, 10) + parseInt(paddingLeft, 10) + parseInt(borderRightWidth, 10) + parseInt(borderLeftWidth, 10);
    var rightSide = paraWidth - totalButtonWidth;

    $button.animate({'left': rightSide, height: 38}, 'slow');
  });
});

$(document).ready(function() {
  $('h2').click(function() {
    $('div.button')
      .fadeTo('slow',0.5)
      .animate({left: 650}, 'slow')
      .fadeTo('slow',1.0)
      .slideUp('slow');
  });
});

$(document).ready(function() {
  $('p:eq(3)').css('backgroundColor', '#fcf').hide();
  $('p:eq(2)').css('backgroundColor', '#cff').click(function() {
    var $thisPara = $(this);
    $thisPara.next().slideDown('slow',function() {
      $thisPara.slideUp('slow');
    });
  });
});

// Make clickable elements appear so on hover.
$(document).ready(function() {
  $('h2, div.button, div.label, span.more, p:eq(2)').hover(function() {
    $(this).addClass('hover');
  }, function() {
    $(this).removeClass('hover');
  });
});