$(document).ready(function() {
  $('h1').click(function() {
    $(window).scrollLeft(50).scrollTop(100);
  });
});

//document and window width
$(document).ready(function() {
  $('#example-dimensions-width .trigger').click(function() {
    var docWidth = $(document).width();
    var winWidth = $(window).width();
    $(this).log('document width: ' + docWidth);
    $(this).log('window width: ' + winWidth);
  });
});

//document and window height
$(document).ready(function() {
  $('#example-dimensions-height .trigger').click(function() {
    var docHeight = $(document).height();
    var winHeight = $(window).height();
    $(this).log('document height: ' + docHeight);
    $(this).log('window height: ' + winHeight);
  });
});

//element height, width
$(document).ready(function() {
  $('#example-dimensions-height-width .trigger').click(function() {
    var boxWidth = $('div.dim-outer').width();
    var boxHeight = $('div.dim-outer').height();
    $(this).log('width: ' + boxWidth + ', width: ' + boxHeight);
  });
});

//elememnt innerHeight, innerWidth
$(document).ready(function() {
  $('#example-dimensions-inner-height-width .trigger').click(function() {
    var boxWidth = $('div.dim-outer').innerWidth();
    var boxHeight = $('div.dim-outer').innerHeight();
    $(this).log('innerWidth: ' + boxWidth + 'innerHeight: ' + boxHeight);
  });
});

//element outerHeight, outerWidth
$(document).ready(function() {
  $('#example-dimensions-outer-height-width .trigger').click(function() {
    var boxHeight = $('div.dim-outer').outerHeight();
    var boxWidth = $('div.dim-outer').outerWidth();
    $(this).log('outerWidth: ' + boxWidth + ', outerHeight: ' + boxHeight);
  });
});

//document scrollTop, scrollLeft
$(document).ready(function() {
  $('#example-dimensions-doc-scroll .trigger').click(function() {
    var sLeft = $(document).scrollLeft();
    var sTop = $(document).scrollTop();
    $(this).log('scrollLeft: ' + sLeft + ', scrollTop: ' + sTop);
  });
});

//element scrollTop, scrollLeft
$(document).ready(function() {
  $('#example-dimensions-scroll .trigger').click(function() {
    var sLeft = $('div.dim-outer').scrollLeft();
    var sTop = $('div.dim-outer').scrollTop();
    $(this).log('scrollLeft: ' + sLeft + ', scrollTop: ' + sTop);
  });
});

//element position (div.dim-outer)
$(document).ready(function() {
  $('#example-dimensions-position .trigger').click(function() {
    var positionOuter = $('div.dim-outer').position();
    $(this).log(positionOuter);
  });
});

//element position (div.dim-outer with params)
$(document).ready(function() {
  $('#example-dimensions-position-params-outer .trigger').click(function() {
    var positionOuterParams = $('div.dim-outer').position({margin: true, border: true, padding: true});
    $(this).log(positionOuterParams);
  });
});

//element position (div.dim-inner)
$(document).ready(function() {
  $('#example-dimensions-position-inner .trigger').click(function() {
    var positionInner = $('div.dim-inner').position();
    $(this).log(positionInner);
  });
});


//element offset (div.dim-outer)
$(document).ready(function() {
  $('#example-dimensions-offset .trigger').click(function() {
    var outerOffset = $('div.dim-outer').offset();
    $(this).log(outerOffset);
  });
});

//element offset param 1 (div.dim-outer)
$(document).ready(function() {
  $('#example-dimensions-offset-param1 .trigger').click(function() {
    var outerOffset = $('div.dim-outer').offset({border: true});
    $(this).log(outerOffset);
  });
});
//element offset param2 (div.dim-outer)
$(document).ready(function() {
  $('#example-dimensions-offset-param2 .trigger').click(function() {
    var outerOffset = $('div.dim-outer').offset({margin: true, border: true, padding: true});
    $(this).log(outerOffset);
  });
});

//element offset param3 (div.dim-outer)
$(document).ready(function() {
  $('#example-dimensions-offset-param3 .trigger').click(function() {
    var theContent = $('#content')[0];
    var outerOffset = $('div.dim-outer').offset({margin: true, border: true, padding: true, relativeTo: theContent});
    $(this).log(outerOffset);
  });
});

$(document).ready(function() {
    $('#example-dimensions-offset-param4 .trigger').click(function() {
      var retObj = {};
      $('div.dim-outer')
      .offset({}, retObj).css('background','#ccc');
      $(this).log(retObj);    
    });
});

//element offset (div.dim-inner)
$(document).ready(function() {
  $('#example-dimensions-offset-inner .trigger').click(function() {
    var innerOffset = $('div.dim-inner').offset();
    $(this).log(innerOffset);
  });
});
//element offset (div.dim-inner)
$(document).ready(function() {
  $('#example-dimensions-offset-inner-params .trigger').click(function() {
    var innerOffsetParams = $('div.dim-inner').offset({margin: true, padding: true, border: true});
    $(this).log(innerOffsetParams);
  });
});
