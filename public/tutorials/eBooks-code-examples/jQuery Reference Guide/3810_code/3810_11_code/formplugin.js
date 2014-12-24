$(document).ready(function() {
  $('#test-form').ajaxForm({
     target: '.ajax-form .log'
  });
});

// formToArray
$(document).ready(function() {
  $('#example-form-to-array .trigger').click(function() {
    $(this).log($('#test-form').formToArray());
  });
});

// formSerialize
$(document).ready(function() {
  $('#example-form-serialize .trigger').click(function() {
    $(this).log($('#test-form').formSerialize());
  });
});

// fieldSerialize
$(document).ready(function() {
  $('#example-field-serialize .trigger').click(function() {
    $(this).log($('#villages').fieldSerialize());
  });
});

// fieldValue
$(document).ready(function() {
  $('#example-field-value .trigger').click(function() {
    $(this).log($('#villages').fieldValue());
  });
});


// clearForm
$(document).ready(function() {
  $('#example-clear-form .trigger').click(function() {
    $('#test-form').clearForm();
  });
});

// clearFields
$(document).ready(function() {
  $('#example-clear-fields .trigger').click(function() {
    $('#villages').clearFields();
  });
});

// resetForm
$(document).ready(function() {
  $('#example-reset-form .trigger').click(function() {
    $('#test-form').resetForm();
  });
});
