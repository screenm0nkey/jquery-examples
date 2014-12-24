$(document).ready(function() {
  $('#test-form .required').prev('label').css('fontWeight', 'bold').end().after(' <span class="reqstar">*</span>');
  var emailFormat = /[-_\.a-zA-Z0-9]+@[-_\.a-zA-Z0-9]+(\.\w)+/i;
  function validateForm() {
    var errorCount = 0;
    var formatError = false;
    var errorMessage = "<p>Please enter information in the following required fields: </p><ul>";
    $('#test-form .required').each(function(index) {
      if (!$(this).val()) {
        $(this).parent('div').addClass('error');
        errorMessage += '<li>' + $(this).prev().text() + '</li>';
        errorCount++;
      } else {
        $(this).parent('div').removeClass('error');
      }
    });
    var $email = $('#email');
    if (!emailFormat.test($email.val())) {
      formatError = '<p>Please enter the email address using the correct format (e.g. john@example.com)</p>';
      $email.parent('div').addClass('error');
      errorCount++;
    } else {
      $email.parent('div').removeClass('error');
    }

    if (errorCount > 0) {          
      errorMessage += '</ul>';
      if (formatError) {
        errorMessage += formatError;
      }
      $('div.log').html(errorMessage);
      return false;
    };
  };


  $('#test-form').ajaxForm({
     target: '.log',
     beforeSubmit: validateForm,
     success: function() {
        var data = $("#test-form").formSerialize();
        data = unescape(data).replace(/&/g,'<br />').replace(/_/g,' ');
        $('div.log').append('<p>You submitted the following information:</p><p>' + data + '</p>');
        $('#test-form').resetForm();
     }
  });
});
