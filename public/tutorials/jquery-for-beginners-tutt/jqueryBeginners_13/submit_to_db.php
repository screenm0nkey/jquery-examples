<?php

$conn = new mysqli('localhost', 'root', '', 'my_db');
$query = "INSERT into comments(name, email, comments) VALUES (?, ?, ?)";

$stmt = $conn->stmt_init();
if($stmt->prepare($query)) {
	$stmt->bind_param('sss', $_POST['name'], $_POST['email'], $_POST['comments']);
	$stmt->execute();
}

if($stmt) {
echo "Thank you. We'll be in touch with you shortly!";
} else {
echo "There was a problem. Please  try again later.";
}

?>