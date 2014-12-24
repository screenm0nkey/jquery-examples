/***************************************
   Insert placeholder text
-------------------------------------- */

$(document).ready(function() {
  var searchLabel = $('#search label').remove().text();
  $('#search-text').addClass('placeholder').val(searchLabel).focus(function() {
    if (this.value == searchLabel) {
      $(this).removeClass('placeholder').val('');
    };
  }).blur(function() {
    if (this.value == '') {
      $(this).addClass('placeholder').val(searchLabel);
    };
  });
  $('#search').submit(function() {
    if ($('#search-text').val() == searchLabel) {
      $('#search-text').val('');
    }
  });
});


/***************************************
   Autocomplete search field
-------------------------------------- */

$(document).ready(function() {
  var $autocomplete = $('<ul class="autocomplete"></ul>').hide().insertAfter('#search-text');
  var selectedItem = null;

  var setSelectedItem = function(item) {
    selectedItem = item;

    if (selectedItem === null) {
      $autocomplete.hide();
      return;
    }

    if (selectedItem < 0) {
      selectedItem = 0;
    }
    if (selectedItem >= $autocomplete.find('li').length) {
      selectedItem = $autocomplete.find('li').length - 1;
    }
    $autocomplete.find('li').removeClass('selected').eq(selectedItem).addClass('selected');
    $autocomplete.show();
  };

  var populateSearchField = function() {
    $('#search-text').val($autocomplete.find('li').eq(selectedItem).text());
    setSelectedItem(null);
  };

  $('#search-text').attr('autocomplete', 'off').keyup(function(event) {
    console.log(event.keyCode);
    if (event.keyCode > 40 || event.keyCode == 8) {
      // Keys with codes 40 and below are special (enter, arrow keys, escape, etc.).
      // Key code 8 is backspace.
      $.ajax({
        'url': '/bookstore/search/autocomplete.php',
        'data': {'search-text': $('#search-text').val()},
        'dataType': 'json',
        'type': 'POST',
        'success': function(data) {
          if (data.length) {
            $autocomplete.empty();
            $.each(data, function(index, term) {
              $('<li></li>').text(term).appendTo($autocomplete).mouseover(function() {
                setSelectedItem(index);
              }).click(populateSearchField);
            });

            setSelectedItem(0);
          }
          else {
            setSelectedItem(null);
          }
        }
      });
    }
    else if (event.keyCode == 38 && selectedItem !== null) {
      // User pressed up arrow.
      setSelectedItem(selectedItem - 1);
      event.preventDefault();
    }
    else if (event.keyCode == 40 && selectedItem !== null) {
      // User pressed down arrow.
      setSelectedItem(selectedItem + 1);
      event.preventDefault();
    }
    else if (event.keyCode == 27 && selectedItem !== null) {
      // User pressed escape key.
      setSelectedItem(null);
    }
  }).keypress(function(event) {
    if (event.keyCode == 13 && selectedItem !== null) {
      // User pressed enter key.
      populateSearchField();
      event.preventDefault();
    }
  }).blur(function(event) {
    setTimeout(function() {
      setSelectedItem(null);
    }, 250);
  });
});

/***************************************
   Contact form
-------------------------------------- */

$(document).ready(function() {

  // Enhance style of form elements.

  // Turn legends into h3s.
  $('fieldset').each(function(index) {
    var heading = $('legend', this).remove().text();
    $('<h3></h3>')
    .text(heading)
    .prependTo(this);
  });

  // Create a "legend" above the form that defines symbols for required and special fields.
  var requiredFlag = ' * ';
  var requiredKey = $('input.required:first').next('span').text();
  requiredKey = requiredFlag + requiredKey.replace(/^\((.+)\)$/,"$1");

  var conditionalFlag = ' ** ';
  var conditionalKey = $('input.conditional:first').next('span').text();
  conditionalKey = conditionalFlag + conditionalKey.replace(/\((.+)\)/,"$1");

  $('form :input').filter('.required')
  .next('span').text(requiredFlag).end()
  .prev('label').addClass('req-label');

  $('form :input').filter('.conditional')
  .next('span').text(conditionalFlag);

  $('<p></p>')
  .addClass('field-keys')
  .append(requiredKey + '<br />')
  .append(conditionalKey)
  .insertBefore('#contact');

  // Checkbox toggle: conditional text inputs.
  $('input.conditional').hide().each(function() {
    var $thisInput = $(this);
    var $thisFlag = $thisInput.next('span').hide();
    $thisInput.prev('label').find(':checkbox').click(function() {
      if (this.checked) {
        $thisInput.show().addClass('required');
        $thisFlag.show();
        $(this).parent('label').addClass('req-label');
      } else {
        $thisInput.hide().removeClass('required').blur();
        $thisFlag.hide();
        $(this).parent('label').removeClass('req-label');
      };
    });
  });

  // Validate fields on blur.
  $('form :input').blur(function() {
    $(this).parents('li:first').removeClass('warning')
    .find('span.error-message').remove();
    
    if ($(this).is('.required')) {
      var $listItem = $(this).parents('li:first');
      if (this.value == '') {
        var errorMessage = 'This is a required field';
        if ($(this).is('.conditional')) {
          errorMessage += ', when its related checkbox is checked';
        };
        $('<span></span>')
          .addClass('error-message')
          .text(errorMessage)
          .appendTo($listItem);
        $listItem.addClass('warning');
      };
    };

    if ($(this).is('#email')) {
      var $listItem = $(this).parents('li:first');
      if (this.value != '' && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value)) {
        var errorMessage = 'Please use proper e-mail format (e.g. joe@example.com)';
        $('<span></span>')
          .addClass('error-message')
          .text(errorMessage)
          .appendTo($listItem);
        $listItem.addClass('warning');
      };
    };
  });

  // Validate form on submit.
  $('form').submit(function() {
    $('#submit-message').remove();
    $(':input.required').trigger('blur');
    var numWarnings = $('.warning', this).length;
    if (numWarnings) {
      var fieldList = [];
      $('.warning label').each(function() {
        fieldList.push($(this).text());
      });
      $('<div></div>')
      .attr({
        'id': 'submit-message',
        'class': 'warning'
      })
      .append('Please correct errors with the following ' + numWarnings + ' fields:<br />')
      .append('&bull; ' + fieldList.join('<br />&bull; '))
      .insertBefore('#send');
      return false;
    };
  });

  // Checkboxes
  $('form :checkbox').removeAttr('checked');

  // Checkboxes with (un)check all.
  $('<li></li>').html('<label><input type="checkbox" id="discover-all" /> <em>check all</em></label>').prependTo('li.discover > ul');
  $('#discover-all')
  .click(function() {
    var $checkboxes = $(this).parents('ul:first').find(':checkbox');
    if (this.checked) {
      $(this).next().text(' un-check all');
      $checkboxes.attr('checked', 'true');
    } else {
      $(this).next().text(' check all');
      $checkboxes.attr('checked', '');
    };
  })
  .parent('label')
  .css({
    borderBottom: '1px solid #ccc',
    color: '#777',
    lineHeight: 2
  });
});


/***************************************
   Shopping cart
-------------------------------------- */

$(document).ready(function() {
  var stripe = function() {
    $('#cart tbody tr:visible:even').removeClass('odd').addClass('even');
    $('#cart tbody tr:visible:odd').removeClass('even').addClass('odd');
  };
  stripe();

  $('#recalculate').hide();

  $('.quantity input').keypress(function(event) {
    if (event.charCode && (event.charCode < 48 || event.charCode > 57)) {
      event.preventDefault();
    }
  }).change(function() {
    var totalQuantity = 0;
    var totalCost = 0;
    $('#cart tbody tr').each(function() {
      var price = parseFloat($('.price', this).text().replace(/^[^\d.]*/, ''));
      price = isNaN(price) ? 0 : price;
      var quantity = parseInt($('.quantity input', this).val());
      var cost = quantity * price;
      $('.cost', this).text('$' + cost.toFixed(2));
      totalQuantity += quantity;
      totalCost += cost;
    });
    $('.subtotal .cost').text('$' + totalCost.toFixed(2));
    var taxRate = parseFloat($('.tax .price').text()) / 100;
    var tax = Math.ceil(totalCost * taxRate * 100) / 100;
    $('.tax .cost').text('$' + tax.toFixed(2));
    totalCost += tax;
    $('.shipping .quantity').text(String(totalQuantity));
    var shippingRate = parseFloat($('.shipping .price').text().replace(/^[^\d.]*/, ''));
    var shipping = totalQuantity * shippingRate;
    $('.shipping .cost').text('$' + shipping.toFixed(2));
    totalCost += shipping;
    $('.total .cost').text('$' + totalCost.toFixed(2));
  });

  $('<th>&nbsp;</th>').insertAfter('#cart thead th:nth-child(2)');
  $('#cart tbody tr').each(function() {
    $deleteButton = $('<img />').attr({
      'width': '16',
      'height': '16',
      'src': '../icons/cross.png',
      'alt': 'remove from cart',
      'title': 'remove from cart',
      'class': 'clickable'
    }).click(function() {
      $(this).parents('tr').find('.quantity input')
        .val(0).trigger('change')
      .end().hide();
      stripe();
    });
    $('<td></td>').insertAfter($('td:nth-child(2)', this)).append($deleteButton);
  });
  $('<td>&nbsp;</td>').insertAfter('#cart tfoot td:nth-child(2)');
});


/***************************************
   Edit shipping information
-------------------------------------- */

$(document).ready(function() {
  var editShipping = function() {
    $.get('shipping.php', function(data) {
      $('#shipping-name').remove();
      $(data).hide().appendTo('#shipping').slideDown();
      $('#shipping form').submit(saveShipping);
    });
    return false;
  };
  var saveShipping = function() {
    var postData = $('#shipping :input').serialize();
    $.post('shipping.php', postData, function(data) {
      $('#shipping form').remove();
      $(data).appendTo('#shipping');
      $('#shipping-name').click(editShipping);
    });
    return false;
  };
  $('#shipping-name').click(editShipping);
});

