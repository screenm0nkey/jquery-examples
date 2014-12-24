$(document).ready(function() {
  $('#switcher .button').click(function(event) {
    $('body').removeClass();
    if (this.id == 'switcher-narrow') {
      $('body').addClass('narrow');
    }
    else if (this.id == 'switcher-large') {
      $('body').addClass('large');
    }
    $('#switcher .button').removeClass('selected');
    $(this).addClass('selected');
    event.stopPropagation();
  });
});

$(document).ready(function() {
  $('#switcher .button').hover(function() {
    $(this).addClass('hover');
  }, function() {
    $(this).removeClass('hover');
  });
});

$(document).ready(function() {
  var toggleStyleSwitcher = function() {
    $('#switcher .button').toggleClass('hidden');
  };

  $('#switcher').click(toggleStyleSwitcher);

  $('#switcher-normal').click(function() {
    $('#switcher').click(toggleStyleSwitcher);
  });
  $('#switcher-narrow, #switcher-large').click(function() {
    $('#switcher').unbind('click', toggleStyleSwitcher);
  });
});

$(document).ready(function() {
  $('#switcher').click();
});
