<?php
    // Header
  	header("Access-Control-Allow-Origin: *");

    // Evaluate data are all present
	if (!isset($_POST['name'])
     || !isset($_POST['email'])
     || !isset($_POST['phone'])
     || !isset($_POST['message'])) {
		echo 'bad data';
		exit('');
	}

	//Define the $_POST variables...
	$name =      $_REQUEST['name'];
	$email =   $_REQUEST['email'];
	$message =   $_REQUEST['message'];
	$fromEmail = $_REQUEST['fromEmail'];
	
	$headers = "MIME-Version: 1.0" . "\r\n";
    	$headers .= "Content-type: text/html; charset=iso-8859-1" . "\r\n";
    	$headers .= "From: " . $fromEmail . "\r\n" .
        "Reply-To: " . $fromEmail . "\r\n" .
	"X-Mailer: PHP/" . phpversion();

	//Send the email and print sender confirmation...
   	$success = mail( $toEmail, "Fancy Title", $message, $headers); 
	if ($success)
	{
  		echo('Your message has been sent successfully!');
	}
	else
	{
		echo(error_get_last()['message']);
	}
?>