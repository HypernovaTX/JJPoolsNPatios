<?php
	// Original source code written by: Mr-Ventures (https://github.com/Mr-Ventures)
	// Modified by HypernovaTX
	// Import some stuffs
	include './secrets.php';

    // Header
  	header ("Access-Control-Allow-Origin: *");

    // Evaluate data are all present
	if (!isset ($_POST['name'])
     || !isset ($_POST['email'])
     || !isset ($_POST['phone'])
	 || !isset ($_POST['title'])
     || !isset ($_POST['message'])
	 || !isset ($_POST['secret'])) {
		echo ('bad data');
		exit ('');
	}

	// Define the variables
	date_default_timezone_set('America/Chicago');
	$name =      $_POST['name'];
	$email =     $_POST['email'];
	$phone =     $_POST['phone'];
	$title =     $_POST['title'];
	$message =   $_POST['message'];
	$in_secret = $_POST['secret'];
	$my_secret = base64_encode($emailSalt.strval(round(time() / 10))); // $emailSalt is pulled from ./secrets.php
	$dest =      $toEmail;
	$date =      date('F j, Y, h:i:s a', time());

	// Check on the hash
	if ($in_secret !== $my_secret) {
		echo ('bad secret');
		exit ('');
	}
	
	// Email headers
	$headers =  "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1" . "\r\n";
    $headers .= "From: " . $email . "\r\n" . "Reply-To: " . $dest . "\r\n" . "X-Mailer: PHP/" . phpversion ();

	// Format the message
	$messageTo = '<h3 style="color: #0049a8;">You have received an inquiry!</h3><p>';
	$messageTo .= "<strong>Name:</strong> {$name}<br />";
	$messageTo .= "<strong>Phone:</strong> {$phone}<br />";
	$messageTo .= "<strong>Email:</strong> {$email}<br />";
	$messageTo .= "<strong>Time:</strong> {$date}<br />";
	$messageTo .= "<strong>Message:</strong><br />{$message}</p>";

	// Send the email to the recipient
   	$success = mail ($dest, $title, $messageTo, $headers); 

	// Determine success/failure
	if (!$success) {
		echo (error_get_last ()['message']);
		exit ('');
	}
	echo ('success');
?>