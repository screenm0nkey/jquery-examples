//window height, width
$(document).ready(function() {
  $('#example-dimensions-win-height-width .trigger').click(function() {
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    $(this).log('window height: ' + winHeight + ', window width: ' + winWidth);
  });
});

//document height, width
$(document).ready(function() {
  $('#example-dimensions-doc-height-width .trigger').click(function() {
    var docHeight = $(document).height();
    var docWidth = $(document).width();
    $(this).log('docdow height: ' + docHeight + ', docdow width: ' + docWidth);
  });
});

//element height, width
$(document).ready(function() {
  $('#example-dimensions-height-width .trigger').click(function() {
    var boxHeight = $('div.dim-outer').height();
    var boxWidth = $('div.dim-outer').width();
    $(this).log('height: ' + boxHeight + ', width: ' + boxWidth);
  });
});

//elememnt innerHeight, innerWidth
$(document).ready(function() {
  $('#example-dimensions-inner-height-width .trigger').click(function() {
    var boxHeight = $('div.dim-outer').innerHeight();
    var boxWidth = $('div.dim-outer').innerWidth();
    $(this).log('innerHeight: ' + boxHeight + ', innerWidth: ' + boxWidth);
  });
});

//element outerHeight, outerWidth
$(document).ready(function() {
  $('#example-dimensions-outer-height-width .trigger').click(function() {
    var boxHeight = $('div.dim-outer').outerHeight();
    var boxWidth = $('div.dim-outer').outerWidth();
    $(this).log('outerHeight: ' + boxHeight + ', outerWidth: ' + boxWidth);
  });
});

//element scrollTop, scrollLeft
$(document).ready(function() {
  $('#example-dimensions-scroll .trigger').click(function() {
    var sTop = $('div.dim-outer').scrollTop();
    var sLeft = $('div.dim-outer').scrollLeft();
    $(this).log('scrollTop: ' + sTop + ', scrollLeft: ' + sLeft);
  });
});

//document scrollTop, scrollLeft
$(document).ready(function() {
  $('#example-dimensions-doc-scroll .trigger').click(function() {
    var sTop = $(document).scrollTop();
    var sLeft = $(document).scrollLeft();
    $(this).log('scrollTop: ' + sTop + ', scrollLeft: ' + sLeft);
  });
});

//element offset (div.dim-outer)
$(document).ready(function() {
  $('#example-dimensions-offset .trigger').click(function() {
    var outerOffsetTop = $('div.dim-outer').offset().top;
    var outerOffsetLeft = $('div.dim-outer').offset().left;
    var outerOffsetScrollTop = $('div.dim-outer').offset().scrollTop;
    var outerOffsetScrollLeft = $('div.dim-outer').offset().scrollLeft;    
    $(this).log('top: ' + outerOffsetTop + ', left: ' + outerOffsetLeft + ', scrollTop: ' + outerOffsetScrollTop + ', scrollLeft: ' + outerOffsetScrollLeft);
  });
});

//element offset (div.dim-inner)
$(document).ready(function() {
  $('#example-dimensions-offset-inner .trigger').click(function() {
    var innerOffsetTop = $('div.dim-inner').offset().top;
    var innerOffsetLeft = $('div.dim-inner').offset().left;
    var innerOffsetScrollTop = $('div.dim-inner').offset().scrollTop;
    var innerOffsetScrollLeft = $('div.dim-inner').offset().scrollLeft;    
    $(this).log('top: ' + innerOffsetTop + ', left: ' + innerOffsetLeft + ', scrollTop: ' + innerOffsetScrollTop + ', scrollLeft: ' + innerOffsetScrollLeft);
  });
});
