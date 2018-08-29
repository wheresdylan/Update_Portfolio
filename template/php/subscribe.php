<?php
/**
This subscribes a new member to a list.
**/
require_once '../classes/MCAPI.class.php';
require_once 'config.mailchimp.php';

// Checks if the a form is submitted.
//if (isset($_POST['submit']))
//{

	// Checks the form
	if ( ! isset($_POST['email']) OR $_POST['email'] == '')
	{
		echo 'You must provide an email address.';
		echo '<br />';
		echo '<a href="index.html">Go Back</a>';
		die;
	}
	
	if ( ! isset($_POST['name']) OR $_POST['name'] == '')
	{
		$name = '';
	}
	else
	{
		$name = $_POST['email'];
	}
	
	if ( ! isset($_POST['surname']) OR $_POST['surname'] == '')
	{
		$surname = '';
	}
	else
	{
		$surname = $_POST['surname'];
	}
	
	// Generates the MailChimp Submission Call
	$api = new MCAPI($apikey);

	$merge_vars = array(
		$fname => $name,
		$lname => $surname,
	     );
	
	// Calls the MailChimp API
	$retval = $api->listSubscribe($listId, $_POST['email'], $merge_vars, $email_type, $need_confirmation, $update_existing, FALSE, $send_welcome);

	if ($api->errorCode)
	{
		echo $api->errorMessage;
	}
	else
	{
	    echo 'You are now subscribed - Please look for the confirmation email!';
		die;
	}
//}
//else
//{
	// Nothing is sent
	// Redirects the user to the main page
	//header('Location: index.html'); 
//}

?>