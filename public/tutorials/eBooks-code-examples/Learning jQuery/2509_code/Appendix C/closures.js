$(document).ready(function() {
  $('.log').append($('<div class="log-title">Results:</div>'));
});

jQuery.fn.log = function(message) {
  if (typeof(message) == 'number') {
    message = String(message);
  }
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
}

$(document).ready(function() {
  function f() {
    function g() {
      $('#example-1').log('hello');
    }
    g();
  }
  f();
  //g();
});

$(document).ready(function() {
  var m;

  function f() {
    function g() {
      $('#example-2').log('hello');
    }
    m = g;
  }
  f();
  m();
});

$(document).ready(function() {
  function f() {
    function g() {
      $('#example-3').log('hello');
    }
    return g;
  }
  var m = f();
  m();
});

$(document).ready(function() {
  function f() {
    function g() {
      var a = 0;
      a++;
      $('#example-4').log(a);
    }
    return g;
  }
  var m = f();
  m();
  m();
  var n = f();
  n();
  n();
});

$(document).ready(function() {
  var a = 0;
  function f() {
    function g() {
      a++;
      $('#example-5').log(a);
    }
    return g;
  }
  var m = f();
  m();
  m();
  var n = f();
  n();
  n();
});

$(document).ready(function() {
  function f() {
    var a = 0;
    function g() {
      a++;
      $('#example-6').log(a);
    }
    return g;
  }
  var m = f();
  m();
  m();
  var n = f();
  n();
  n();
  m();
  n();
});

$(document).ready(function() {
  function f() {
    var a = 0;
    function g() {
      a++;
      $('#example-7').log(a);
    }
    function h() {
      a = a + 2;
      $('#example-7').log(a);
    }
    return {'g': g, 'h': h};
  }
  var m = f();
  m.g();
  m.h();
  m.g();
  var n = f();
  n.g();
  n.h();
  n.g();
});

$(document).ready(function() {
  var a = 0;
  $('#example-8 .trigger').click(function() {
    a++;
    $('#example-8').log(a);
  });
});

$(document).ready(function() {
  var a = 0;
  $('#example-9 .add').click(function() {
    a++;
    $('#example-9').log(a);
  });
  $('#example-9 .subtract').click(function() {
    a--;
    $('#example-9').log(a);
  });
});

$(document).ready(function() {
  $('#example-10 li').each(function(index) {
    $(this).click(function() {
      $(this).log(index);
    });
  });
});

$(document).ready(function() {
  $('#example-11 li').each(function(index) {
    function f() {
      $('#example-11').log(index);
    }

    $(this).click(f);
  });
});
/*
$(document).ready(function() {
  function f() {
    $('#example-12').log(index);
  }

  $('#example-12 li').each(function(index) {
    $(this).click(f);
  });
});
*/