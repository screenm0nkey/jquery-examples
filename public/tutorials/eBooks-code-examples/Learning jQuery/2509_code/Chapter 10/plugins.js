$(document).ready(function() {
  var $item = $('#grandparent-plugin .start');
  $item.log($item.text());
  $item.log($item.grandparent().text());
  $item.log($item.text());
});


$(document).ready(function() {
  $('#slidefade-plugin .trigger').toggle(function() {
    $('#slidefade-plugin .target').slideFadeOut('slow');
  }, function() {
    $('#slidefade-plugin .target').slideFadeIn('slow');
  });
});

$(document).ready(function() {
  $('#log-plugin .trigger').click(function() {
    $(this).log('Thanks for clicking the button!');
  });
});

$(document).ready(function() {
  $('.nthchild li:nth-child(3n+2)').css('background-color', '#ffd');
});

$(document).ready(function() {
  $('#easing-plugin .trigger').toggle(function() {
    $('#easing-plugin .default .sprite').animate({'left': 791, 'opacity': 0.1}, 5000);
    $('#easing-plugin .linear .sprite').animate({'left': 791, 'opacity': 0.1}, 5000, 'linear');
    $('#easing-plugin .back-n-forth .sprite').animate({'left': 791, 'opacity': 0.1}, 5000, 'back-n-forth');
  }, function() {
    $('#easing-plugin .default .sprite').animate({'left': 1, 'opacity': 1.0}, 5000);
    $('#easing-plugin .linear .sprite').animate({'left': 1, 'opacity': 1.0}, 5000, 'linear');
    $('#easing-plugin .back-n-forth .sprite').animate({'left': 1, 'opacity': 1.0}, 5000, 'back-n-forth');
  });
});
