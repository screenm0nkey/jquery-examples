$(document).ready(function() {
  $('#example-traversing-filter1 li').filter(':even').addClass('highlight');
});
$(document).ready(function() {
  $('#example-traversing-filter2 li').filter(':gt(0):even').addClass('highlight');
});
$(document).ready(function() {
  $('#example-traversing-filter3 li').filter(':even:gt(0)').addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-functionfilter1 li').filter(function(index) {
    return $("strong", this).length == 1;
  }).addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-functionfilter2 li').filter(function(index) {
    return index % 3 == 2;
  }).addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-not1 li').not(':even').addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-not2 li').not(':odd:first').addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-not3 li').not(':first:odd').addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-notelement li').not(document.getElementById('notli')).addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-contains li').contains('item 2').addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-eq li').eq(2).addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-gt li').gt(2).addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-lt li').lt(2).addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-add li').add('#example-traversing-add p').addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-addhtml li').add('<p>please</p>').addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-addelements li').add(document.getElementById('addp')).addClass('highlight');
});

$(document).ready(function() {  
  $('#example-traversing-is li').each(function() {
    if ($(this).is(':nth-child(2)') ) {
      $(this).addClass('highlight');
    }
  });
});

$(document).ready(function() {
  $('#example-traversing-find li.item-ii').find('li').addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-children ul.level-2').children().addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-parents li.item-a').parents('ul').addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-parent li.item-a').parent().addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-siblings .third-item').siblings().addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-prev .third-item').prev().addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-next .third-item').next().addClass('highlight');
});

$(document).ready(function() {
  $('#example-traversing-end ul.first')
    .find('.foo')
      .addClass('highlight')
    .end()
    .find('.bar')
      .addClass('highlight');
});

