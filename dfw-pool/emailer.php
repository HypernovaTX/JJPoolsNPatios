<?php
	// Original source code written by: Mr-Ventures (https://github.com/Mr-Ventures)
	// Modified by HypernovaTX
	// Import some stuffs
	include './secrets.php';

    // Header
  	header("Access-Control-Allow-Origin: *");

    // Evaluate data are all present
	if (!isset($_POST['name'])
     || !isset($_POST['email'])
     || !isset($_POST['phone'])
	 || !isset($_POST['title'])
     || !isset($_POST['message'])
	 || !isset($_POST['secret'])) {
		echo 'bad data';
		exit('');
	}

	// Define the variables
	$name =      $_POST['name'];
	$email =     $_POST['email'];
	$phone =     $_POST['phone'];
	$title =     $_POST['title'];
	$message =   $_POST['message'];
	$in_secret = $_POST['secret'];
	$my_secret = base64_encode($emailSalt + round(time() / 10));
	$dest =      $toEmail;

	// Check on the hash ($emailSalt is pulled from ./secrets.php)
	if (!$secret === $emailSalt) {
		echo 'bad secret';
		exit('');
	}
	// TO DO - Need hash security
	
	// Email headers
	$headers =  "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1" . "\r\n";
    $headers .= "From: " . $email . "\r\n" . "Reply-To: " . $dest . "\r\n" . "X-Mailer: PHP/" . phpversion();

	// Send the email
   	$success = mail($dest, $title, $message, $headers); 

	// Determine success/failure
	if (!$success) {
		echo(error_get_last()['message']);
		exit('');
	}
	echo('success');
?>