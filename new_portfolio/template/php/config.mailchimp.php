<?php
	// Insert your API Key - see http://admin.mailchimp.com/account/api
	$apikey = '9ee8975954e41a6334fdab57581c2243-us6';

    // Insert the List ID of the list you want the user to be subscribed to
    $listId = '18791b195c';
    	
	// By default, MailChimp sends a confirmation email to every new member. Use FALSE to deactivate this beavihor
	$need_confirmation = TRUE;
	
	// By default, MailChimp uses FNAME and LNAME as Merge Tags. Change those if needed 
	$fname = 'FNAME';
	$lname = 'NAME';
	
	// Subscribe the user to the HTML or TEXT version of your newsletter. Preferred : HTML
	$email_type = 'html';
	
	// If the email is already present in the List, do we update the user info with the new one provided ? TRUE or FALSE
	$update_existing = FALSE;
	
	// Once the user has been added to the list, does MailChimp sends him a Welcome email ? TRUE or FALSE
	$send_welcome = FALSE;
	
    /**
     * DO NO NEET EDIT BELOW
     */

 	$apiUrl = 'http://api.mailchimp.com/1.3/';
    
?>
