$(document).ready(function() {
  $('.example .content').hide();
  
  $('.example h3').click(function() {
    $(this).parent().find('.content').slideToggle();
  });
  
  $('.category h2').click(function() {
    $(this).parent().find('.content').slideToggle();
  });
  
  $('.log').append($('<div class="log-title">Results:</div>'));
});

jQuery.fn.log = function(message, depth) {
  if (depth == null) {
    depth = 2;
  }
  function serializeObject(object, depth) {
    if (depth && typeof(object) == 'object') {
      if (object.constructor == Array) {
        string = '[';
        $.each(object, function(key, value) {
          string += serializeObject(value, depth-1) + ', ';
        });
        string += ']';
        return string;
      }
      else {
        string = '{';
        $.each(object, function(key, value) {
          string += key + ': ' + serializeObject(value, depth-1) + ', ';
        });
        string += '}';
        return string;
      }
    }
    return object;
  }
  message = serializeObject(message, depth);

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
