$(document).ready(function() {
  $('.example .content').hide();
  
  $('.example h3').click(function() {
    $(this).parent().find('.content').slideToggle();
  });
  
  $('.category h2').click(function() {
    $(this).parent().find('.content').slideToggle();
  });
  
  $('.log').append($('<div class="log-title">Results:</div>'));
  
  $('span.move-to-top').click(function() {
    $(this).hide()
      .parent().insertAfter('div.dim-outer');
      // .end()
      // .next().css('backgroundColor', '#ffc');
    window.scrollTo(0,100);
  });
});

jQuery.fn.log = function(message) {
  if (typeof(message) == 'object') {
    string = '{';
    $.each(message, function(key, value) {
      string += key + ': ' + value + ', ';
    });
    string += '}';
    message = string;
  }
  return this.each(function() {
    $context = $(this);
    while ($context.length) {
      $log = $context.find('.log');
      if ($log.length) {
        $('<div class="log-message" />').text(message).hide().appendTo($log).fadeIn();
        break;
      }
      $context = $context.parent();
    }
  });
};