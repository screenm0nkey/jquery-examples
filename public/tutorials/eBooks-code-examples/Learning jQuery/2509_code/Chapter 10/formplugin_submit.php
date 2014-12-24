<?php 

// CONTACT FORM CODE

// Address error handling.
ini_set ('display_errors', 1);
error_reporting (E_ALL & ~E_NOTICE);

//In case register_globals is disabled.

    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $subj = $_POST['subj'];    
    $email = trim($email);
    $email_format = "^(([[:alnum:]\._-]){2,24})@([[:alnum:]\._-]+)\.(([a-z]{2,3})|co\.([a-z]{2,3}))$";

// Check if the form has been submitted.
if ( isset ($_POST['submit'])) {

// Adjust if magic quotes is turned on.
    if (ini_get('magic_quotes_gpc')) {
        $email = stripslashes($_POST['email']);
        $comment = stripslashes($_POST['comment']);
    }  else {             // Otherwise, proceed as usual
        $email = $_POST['email'];
        $comment = $_POST['comment'];
    }

 // Set up the EMAIL RECIPIENT 

$send_to = "karl@learningjquery.com";

 // set up subject line
	if ($subj == "") {
		$subj = "Learning jQuery contact form";
	} else {
		$subj = "Learning jQuery: " . $subj;
	}
	
$problem = FALSE; // No problems so far.

	// Check for each value.

	if (empty ($first_name)) {
		$problem = TRUE;
		print '<p class="msg">Your first name is required.</p>';
	}

	if (empty ($last_name)) {
		$problem = TRUE;
		print '<p class="msg">Your last name is required.</p>';
	}
	
 	if (empty ($email)) {
		$problem = TRUE;
		print '<p class="msg">The email address field is required.</p>';
	}
    if (!(eregi($email_format, $email)) && $email != "") {
		$problem = TRUE;
		print '<p class="msg">' . $email . ' is not in the proper email address format.</p>';
    }
	if (empty ($comment)) {
		$problem = TRUE;
		print '<p class="msg">A comment is required (and appreciated).</p>';
	}

	if (!$problem) {   // If there weren't any problems...

		// set a name variable
           $name = $first_name . ' ' . $last_name;

           //display a thank-you message...
		print '<p class="msg">Thank you, ' . $name . ', for contacting me.</p><p class="msg"><strong>Your message has been sent.</strong></p>';


    // format the message body...
    
    $body = $comment . "\n\n From: " . $name .  " (" .  $email .   ") ";

    // and send the email.
    //mail($send_to,$subj,$body,"From: $email" );

    // now clear those form fields.

        $first_name = "";
        $last_name = "";
        $subj = "";
        $email = "";
        $comment= "";

	} else { // Forgot a field.

		print '<p class="msg"><strong>Please try again.</strong></p>';

	}

} // End of handle form IF.


?>