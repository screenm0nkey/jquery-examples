$(document).ready(function() {
  $('#example-misc-browser')
    .log('Safari: ' + $.browser.safari)
    .log('Opera: ' + $.browser.opera)
    .log('MSIE: ' + $.browser.msie)
    .log('Mozilla: ' + $.browser.mozilla);
});

$(document).ready(function() {
  $('#example-misc-length').log('Length: ' + $('#example-misc-length li').length);
});

$(document).ready(function() {
  $('#example-misc-size').log('Size: ' + $('#example-misc-size li').size());
});

$(document).ready(function() {
  $('#example-misc-get').log('Get(0): ' + $('#example-misc-get li').get(0));
  $('#example-misc-get').log('Get(): ' + $('#example-misc-get li').get());
});

$(document).ready(function() {
  var listItem = $('#example-misc-index li')[1];
  $('#example-misc-index').log('Index: ' + $('#example-misc-index li').index(listItem));
});

$(document).ready(function() {
  $('#example-misc-each li').each(function(index) {
    $(this).log(index + ': ' + $(this).text());
  });
  $.each([52, 97], function(index, value) {
    $('#example-misc-each').log(index + ': ' + value);
  });
  $.each({'flammable': 'inflammable', 'duh': 'no duh'}, function(index, value) {
    $('#example-misc-each').log(index + ': ' + value);
  });
});

$(document).ready(function() {
  var array = [0, 1, 52, 97];
  $('#example-misc-grep').log('Before: ' + array);
  array = $.grep(array, function(a) {
    return (a > 50);
  });
  $('#example-misc-grep').log('After: ' + array);

  array = [0, 1, 52, 97];
  $('#example-misc-grep').log('Before: ' + array);
  array = $.grep(array, 'a > 50');
  $('#example-misc-grep').log('After: ' + array);

  array = [0, 1, 52, 97];
  $('#example-misc-grep').log('Before: ' + array);
  array = $.grep(array, 'a > 50', true);
  $('#example-misc-grep').log('After: ' + array);
});

$(document).ready(function() {
  var array = [0, 1, 52, 97];
  $('#example-misc-map').log('Before: ' + array);
  array = $.map(array, function(a) {
    return (a - 45);
  });
  $('#example-misc-map').log('After: ' + array);

  array = [0, 1, 52, 97];
  $('#example-misc-map').log('Before: ' + array);
  array = $.map(array, 'a - 45');
  $('#example-misc-map').log('After: ' + array);

  array = [0, 1, 52, 97];
  $('#example-misc-map').log('Before: ' + array);
  array = $.map(array, 'a > 50 ? a - 45 : null', true);
  $('#example-misc-map').log('After: ' + array);

  array = [0, 1, 52, 97];
  $('#example-misc-map').log('Before: ' + array);
  array = $.map(array, function(a, i) {
    return [a - 45, i];
  });
  $('#example-misc-map').log('After: ' + array);
});

$(document).ready(function() {
  var array1 = [0, 1, 52];
  var array2 = [52, 97];
  $('#example-misc-merge').log('Array 1: ' + array1);
  $('#example-misc-merge').log('Array 2: ' + array2);
  array = $.merge(array1, array2);
  $('#example-misc-merge').log('After: ' + array);
});

$(document).ready(function() {
  var alice = {'alice': 'alice'};
  var bob = {'bob': 'bob'};
  var carol = {'carol': 'carol'};
  var ted = {'bob': 'bob'};
  var array1 = [alice, bob, carol, bob, ted];
  $('#example-misc-unique').log(array1);
  array = $.unique(array1);
  $('#example-misc-unique').log(array);
});

$(document).ready(function() {
  var object1 = {
    apple: 0,
    banana: 52,
    cherry: 97
  };
  var object2 = {
    banana: 1,
    durian: 100
  };
  $('#example-misc-extend').log(object1);
  $('#example-misc-extend').log(object2);
  object = $.extend(object1, object2);
  $('#example-misc-extend').log(object);
});

$(document).ready(function() {
  var string = "\tYes, no, I, this is. \n ";
  $('#example-misc-trim').log('Before: ' + string);
  string = $.trim(string);
  $('#example-misc-trim').log('After: ' + string);
});
