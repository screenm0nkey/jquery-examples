/***************************************
   =NEWS FEED ROTATOR
-------------------------------------- */

$(document).ready(function() {
  // Using each as an 'if' and containing stuff inside a private namespace.
  $('#news-feed').each(function() {
    var $this = $(this);
    $this.empty();

    var totalHeight = $this.height();
    var fadeHeight = totalHeight / 4;

    for (var i = 0; i < fadeHeight; i+=2) {
      $('<div></div>').css({
        opacity: i / fadeHeight,
        top: totalHeight - fadeHeight + i
      }).addClass('fade-slice').appendTo(this);
    }
    var $newsLoading = $('<img/>')
      .attr({
        'src': '/cookbook/images/loading.gif',
        'alt': 'loading. please wait'}
      )
      .addClass('news-wait');
    $this.ajaxStart(function() {
      $this.append($newsLoading);
    }).ajaxStop(function() {
      $newsLoading.remove();
    });

    // Retrieve the news feed.
    $.get('news/feed.php', function(data) {
      $('/rss//item', data).each(function() {
        var title = $('title', this).text();
        var linkText = $('link', this).text();
        var $link = $('<a></a>').attr('href', linkText).text(title);
        $link = $('<h3></h3>').html($link);
        
        var pubDate = new Date($('pubDate', this).text());
        var pubMonth = pubDate.getMonth() + 1;
        var pubDay = pubDate.getDate();
        var pubYear = pubDate.getFullYear();
        var $pubDiv = $('<div></div>')
          .addClass('publication-date')
          .text(pubMonth + '/' + pubDay + '/' + pubYear);

        var summaryText = $('description', this).text();
        // adding this one line to replace ugly bracketed ellipses
        summaryText = summaryText.slice(0,summaryText.indexOf(' [...]')) + ' &hellip;';
        var $summary = $('<div></div>')
          .addClass('summary')
          .html(summaryText);

        $('<div></div>')
          .addClass('headline')
          .append($link)
          .append($pubDiv)
          .append($summary)
          .appendTo('#news-feed');
      });

      // Set up the rotator.
      var currentHeadline = 0, oldHeadline = 0;
      var hiddenPosition = totalHeight   + 10;
      $('div.headline:eq(' + currentHeadline + ')').css('top','0');
      var headlineCount = $('div.headline').length;
      var headlineTimeout;
      var rotateInProgress = false;

      // Rotator function.
      var headlineRotate = function() {
       if (!rotateInProgress) {
          rotateInProgress = true;
          headlineTimeout = false;

          currentHeadline = (oldHeadline + 1) % headlineCount;
          $('div.headline:eq(' + oldHeadline + ')')
          .animate({top: -hiddenPosition}, 'slow', function() {
            $(this).css('top',hiddenPosition);
          });
          $('div.headline:eq(' + currentHeadline + ')')
          .animate({top: 0},'slow', function() {
            rotateInProgress = false;
            if (!headlineTimeout) {
              headlineTimeout = setTimeout(headlineRotate, 5000);
            }
          });
          oldHeadline = currentHeadline;
        }
      };
      headlineTimeout = setTimeout(headlineRotate,5000);

      // On hover, clear the timeout and reset headlineTimeout to 0.
      $('#news-feed').hover(function() {
        clearTimeout(headlineTimeout);
        headlineTimeout = false;
      }, function() {
        // Start the rotation soon when the mouse leaves.
         if (!headlineTimeout) {
           headlineTimeout = setTimeout(headlineRotate, 250);
         }
      }); //end .hover()
    }); // end $.get()
  }); //end .each() for #news-feed
});


/***************************************
   =IMAGE CAROUSEL
-------------------------------------- */

$(document).ready(function() {
  var spacing = 140;
  
  function createControl(src) {
    return $('<img/>')
      .attr('src', src)
      .addClass('control')
      .css('opacity', 0.6)
      .css('display', 'none');
  }
      
  var $leftRollover = createControl('images/left.gif');
  var $rightRollover = createControl('images/right.gif');
  var $enlargeRollover = createControl('images/enlarge.gif');
  var $enlargedCover = $('<img/>')
    .addClass('enlarged')
    .hide()
    .appendTo('body');
  var $closeButton = createControl('images/close.gif')
    .addClass('enlarged-control')
    .appendTo('body');
  var $priceBadge = $('<div/>')
    .addClass('enlarged-price')
    .css('opacity', 0.6)
    .css('display', 'none')
    .appendTo('body');
  var $waitThrobber = $('<img/>')
    .attr('src', 'images/wait.gif')
    .addClass('control')
    .css('z-index', 4)
    .hide();

  $('#featured-books').css({
    'width': spacing * 3,
    'height': '166px',
    'overflow': 'hidden'
  }).find('.covers a').css({
    'float': 'none',
    'position': 'absolute',
    'left': 1000
  });

  var setUpCovers = function() {
    var $covers = $('#featured-books .covers a');

    $covers.unbind('click').unbind('mouseover').unbind('mouseout');

    // Left image; scroll right (to view images on left) when clicked.
    $covers.eq(0).css('left', 0).click(function(event) {
      $covers.eq(0).animate({'left': spacing}, 'fast');
      $covers.eq(1).animate({'left': spacing * 2}, 'fast');
      $covers.eq(2).animate({'left': spacing * 3}, 'fast');
      $covers.eq($covers.length - 1).css('left', -spacing).animate({'left': 0}, 'fast', function() {
        $(this).prependTo('#featured-books .covers');
        setUpCovers();
      });

      event.preventDefault();
    }).hover(function() {
      $leftRollover.appendTo(this).show();
    }, function() {
      $leftRollover.hide();
    });

    // Right image; scroll left (to view images on right) when clicked.
    $covers.eq(2).css('left', spacing * 2).click(function(event) {
      $covers.eq(0).animate({'left': -spacing}, 'fast', function() {
        $(this).appendTo('#featured-books .covers');
        setUpCovers();
      });
      $covers.eq(1).animate({'left': 0}, 'fast');
      $covers.eq(2).animate({'left': spacing}, 'fast');
      $covers.eq(3).css('left', spacing * 3).animate({'left': spacing * 2}, 'fast');

      event.preventDefault();
    }).hover(function() {
      $rightRollover.appendTo(this).show();
    }, function() {
      $rightRollover.hide();
    });

    // Center image; enlarge cover when clicked.
    $covers.eq(1).css('left', spacing).click(function(event) {
      $waitThrobber.appendTo(this).show();

      var price = $(this).find('.price').text();

      var element = $(this).find('img').get(0);
      var coverLeft = 0;
      var coverTop = 0;
      var coverWidth = element.width;
      var coverHeight = element.height;
      while (element.offsetParent) {
        coverLeft += element.offsetLeft;
        coverTop += element.offsetTop;
        element = element.offsetParent;
      }

      $enlargedCover.attr('src', $(this).attr('href')).css({
        'left': coverLeft,
        'top' : coverTop,
        'width': coverWidth,
        'height': coverHeight
      });
      var animateEnlarge = function() {
        $waitThrobber.hide();
        $enlargedCover.animate({
          'left': ($('body').width() - coverWidth * 3) / 2,
          'top' : 100,
          'width': coverWidth * 3,
          'height': coverHeight * 3
        }, 'normal', function() {
          $enlargedCover.one('click', function() {
            $closeButton.unbind('click').hide();
            $priceBadge.hide();
            $enlargedCover.fadeOut();
          });

          $closeButton.css({
            'left': ($('body').width() - coverWidth * 3) / 2,
            'top' : 100
          }).click(function() {
            $enlargedCover.click();
          }).show();

          $priceBadge.css({
            'right': ($('body').width() - coverWidth * 3) / 2,
            'top' : 100
          }).text(price).show();
        });
      };

      if ($enlargedCover[0].complete) {
        animateEnlarge();
      }
      else {
        $enlargedCover.bind('load', animateEnlarge);
      }

      event.preventDefault();
    }).hover(function() {
      $enlargeRollover.appendTo(this).show();
    }, function() {
      $enlargeRollover.hide();
    });
  };

  setUpCovers();
});
