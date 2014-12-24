$(document).ready(function() {
  $('div.content').hide();
  $('div.example h3').click(function() {
    $(this).next('div.content').slideToggle('fast');  
  });
  $('div.section h2').click(function() {
    $(this).parent().find('div.content').slideToggle('fast')
  });
});


$(document).ready(function() {
  $('input:submit').toggle(function() {
    var domtree = $(this).parents('div.section').find('div.domtree');
    var query = $(this).prev().find('span.querystring').text();
    var $findQuery = $(domtree).find(query).css({color: '#c00', background: '#ff6',position: 'relative'})
    .animate({ marginLeft: 10}, 'fast');
  }, function() {
    var domtree = $(this).parents('div.section').find('div.domtree')
    var query = $(this).prev().find('span.querystring').text();
    $(domtree).find(query).css({color: '#000', background: '#fff'})
    .animate({ marginLeft: 0}, 'fast');
  });
});

$(document).ready(function() {
  $('input.switchsource').click(function() {
    var tosource = $(this).next().html().replace(/\n/g,<br />).replace(/</g,"&lt;").replace(/>/g,"&gt;");
    $(this).after('<textarea class="domsource" rows="12">' + tosource + '</textarea>');
    
  });
});