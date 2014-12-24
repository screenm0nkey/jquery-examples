$.fn.alternateRowColors = function() {
  $('tbody tr:odd', this).removeClass('even').addClass('odd');
  $('tbody tr:even', this).removeClass('odd').addClass('even');
  return this;
};

$(document).ready(function() {

  $('table.sortable').each(function() {
    var $table = $(this);
    $table.alternateRowColors();
    $table.find('th').each(function(column) {
      var findSortKey;

      if ($(this).is('.sort-alpha')) {
        findSortKey = function($cell) {
          return $cell.find('.sort-key').text().toUpperCase() + ' ' + $cell.text().toUpperCase();
        };
      }
      else if ($(this).is('.sort-numeric')) {
        findSortKey = function($cell) {
          var key = parseFloat($cell.text().replace(/^[^\d.]*/, ''));
          return isNaN(key) ? 0 : key;
        };
      }
      else if ($(this).is('.sort-date')) {
        findSortKey = function($cell) {
          return Date.parse('1 ' + $cell.text());
        };
      }

      if (findSortKey) {
        $(this).addClass('clickable').hover(function() {
          $(this).addClass('hover');
        }, function() {
          $(this).removeClass('hover');
        }).click(function() {
          var newDirection = 1;
          if ($(this).is('.sorted-asc')) {
            newDirection = -1;
          }

          var rows = $table.find('tbody > tr').get();

          $.each(rows, function(index, row) {
            row.sortKey = findSortKey($(row).children('td').eq(column));
          });
          rows.sort(function(a, b) {
            if (a.sortKey < b.sortKey) return -newDirection;
            if (a.sortKey > b.sortKey) return newDirection;
            return 0;
          });
          $.each(rows, function(index, row) {
            $table.children('tbody').append(row);
            row.sortKey = null;
          });

          $table.find('th').removeClass('sorted-asc').removeClass('sorted-desc');
          var $sortHead = $table.find('th').filter(':nth-child(' + (column + 1) + ')');
          if (newDirection == 1) {
            $sortHead.addClass('sorted-asc');
          } else {
            $sortHead.addClass('sorted-desc');
          }
          $table.find('td').removeClass('sorted')
            .filter(':nth-child(' + (column + 1) + ')').addClass('sorted');

          $table.alternateRowColors().trigger('repaginate');
        });
      }
    });
  });
});


$(document).ready(function() {
  $('table.paginated').each(function() {
    var currentPage = 0;
    var numPerPage = 10;

    var $table = $(this);

    $table.bind('repaginate', function() {
      $table.find('tbody tr').show()
        .lt(currentPage * numPerPage)
          .hide()
        .end()
        .gt((currentPage + 1) * numPerPage - 1)
          .hide()
        .end();
    });

    var numRows = $table.find('tbody tr').length;
    var numPages = Math.ceil(numRows / numPerPage);

    var $pager = $('<div class="pager"></div>');
    for (var page = 0; page < numPages; page++) {
      $('<span class="page-number">' + (page + 1) + '</span>')
        .bind('click', {'newPage': page}, function(event) {
          currentPage = event.data['newPage'];
          $table.trigger('repaginate');
          $(this).addClass('active').siblings().removeClass('active');
        })
        .appendTo($pager).addClass('clickable');
    }
    $pager.find('span.page-number:first').addClass('active');
    $pager.insertBefore($table);

    $table.trigger('repaginate');
  });
});


/***************************************
   =ADVANCED ROW STRIPING
-------------------------------------- */
/*  3 alternating single rows */

// $(document).ready(function() {
//   var classNames = {
//     0: 'first',
//     1: 'second',
//     2: 'third'
//   };
//   $('table.striped tbody tr').not('[th]').each(function(index) {
//
//     $(this).addClass(classNames[index % 3]);
//   });
// });

/*  alternating groups of three rows - resets at subheads */

// $(document).ready(function() {
//   var rowClass = 'even';
//   var rowIndex = 0;
//   $('table.striped tbody tr').each(function(index) {
//     if ($('th', this).length) {
//       rowClass = 'subhead';
//       rowIndex = -1;
//     } else
//      if (rowIndex % 3 == 0) {
//       rowClass = (rowClass == 'even' ? 'odd' : 'even');
//     };
//     $(this).addClass(rowClass);
//     rowIndex++;
//   });
// });

// $(document).ready(function() {
//   var rowIndex = 0;
//   $('table.striped tbody tr').each(function(index) {
//     if ($('th',this).length) {
//       $(this).addClass('subhead');
//       rowIndex = -1;
//     } else {
//       if (rowIndex % 6 < 3) {
//         $(this).addClass('even');
//       }
//       else {
//         $(this).addClass('odd');
//       }
//     };
//     rowIndex++;
//   });
// });

/***************************************
   =HIGHLIGHT ROWS BY AUTHOR
-------------------------------------- */

$(document).ready(function() {
  var highlighted = "";
  var column = 3;

  var positionTooltip = function(event) {
    var tPosX = event.pageX;
    var tPosY = event.pageY+20;
    $('div.tooltip').css({top: tPosY, left: tPosX});
  };
  var showTooltip = function(event) {
    $('div.tooltip').remove();
    var $thisAuthor = $(this).text();
    if ($(this).parent().is('.highlight')) {
      highlighted = 'un-';
    } else {
      highlighted = '';
    };
    $('<div class="tooltip">Click to ' + highlighted + 'highlight all articles written by ' + $thisAuthor + '</div>').appendTo('body');
    positionTooltipevent.char;
  };
  var hideTooltip = function() {
    $('div.tooltip').remove();
  };

  $('table.striped td:nth-child(' + column + ')' )
  .addClass('clickable')
  .click(function(event) {
    var thisClicked = $(this).text();
    $('table.striped td:nth-child(' + column + ')' ).each(function(index) {
      if (thisClicked == $(this).text()) {
        $(this).parent().toggleClass('highlight');
      } else {
        $(this).parent().removeClass('highlight')
      };
    });
    showTooltip.call(this, event);//call the function as if it were defined right here. calls it in the scope we're giving it. in this case, "this" also passing in the event because we need the info for the positioning
  })
  .hover(showTooltip, hideTooltip)//referencing the function defined elsewhere. no parens
  .mousemove(positionTooltip);
});

$(document).ready(function() {
  $('table.striped').each(function() {
    $(this).bind('stripe', function() {
      var rowIndex = 0;
      $('tbody tr:not(.filtered)', this).each(function(index) {
        if ($('th',this).length) {
          $(this).addClass('subhead');
          rowIndex = -1;
        } else {
          if (rowIndex % 6 < 3) {
            $(this).removeClass('odd').addClass('even');
          }
          else {
            $(this).removeClass('even').addClass('odd');
          }
        };
        rowIndex++;
      });
    });
    $(this).trigger('stripe');
  });
});

/***************************************
   =FILTERING
-------------------------------------- */

$(document).ready(function() {
  $('table.filterable').each(function() {
    var $table = $(this);

    $table.find('th').each(function (column) {
      if ($(this).is('.filter-column')) {
        var $filters = $('<div class="filters"><h3>Filter by ' + $(this).text() + ':</h3></div>');
        var keywords = {};

        $table.find('tbody tr td').filter(':nth-child(' + (column + 1) + ')').each(function() {
          keywords[$(this).text()] = $(this).text();
        });

        $('<div class="filter">all</div>').click(function() {
          $table.find('tbody tr').removeClass('filtered').not('.collapsed').show();
          $(this).addClass('active').siblings().removeClass('active');
          $table.trigger('stripe');
        }).addClass('clickable active').appendTo($filters);

        $.each(keywords, function (index, keyword) {
          $('<div class="filter"></div>').text(keyword).bind('click', {'keyword': keyword}, function(event) {
            $table.find('tbody tr').each(function() {
              if ($('td', this).filter(':nth-child(' + (column + 1) + ')').text() == event.data['keyword']) {
                $(this).removeClass('filtered').not('.collapsed').show();
              }
              else if ($('th',this).length == 0) {
                $(this).addClass('filtered').hide();
              }
            });

            $(this).addClass('active').siblings().removeClass('active');
            $table.trigger('stripe');
          }).addClass('clickable').appendTo($filters);

        });
        $filters.insertBefore($table);
      }
    });
  });
});

/***************************************
   =COLLAPSE AND EXPAND TABLE SECTIONS
-------------------------------------- */

$(document).ready(function() {
  var $subHead = $('tbody th:first-child');
  var toggleMinus = '../icons/bullet_toggle_minus.png';
  var togglePlus = '../icons/bullet_toggle_plus.png';
  $subHead.prepend('<img src="../../../../../Learning jQuery/2509_code/bookstore/scripts/' + toggleMinus + '" alt="collapse this section" />');

  $('img', $subHead).addClass('clickable')
  .click(function() {
    var toggleSrc = $(this).attr('src');
    if ( toggleSrc == toggleMinus ) {
      $(this).attr('src', togglePlus)
      .parents('tr').siblings().addClass('collapsed').fadeOut('fast');
    } else{
      $(this).attr('src', toggleMinus)
      .parents('tr').siblings().removeClass('collapsed').not('.filtered').fadeIn('fast');
    };
  });
});

