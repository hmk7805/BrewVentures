<?php

require('class.phpmailer.php');
$mail = new PHPMailer();
// Only process POST reqeusts.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and remove whitespace.
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $message = trim($_POST["message"]);

    // ================================================================================
    // =================== Update this to your desired email address. =================
    // ================================================================================
    $recipient = "hello@example.com";
    // Set the email subject.
    $subject = "New contact from $name";

    $mail->FromName  = "From: $name <$email>";
    /*$mail->setFrom('mail@example.com', 'example.com');*/ // mailbox created on a server.
    $mail->Subject   = $subject;
    $mail->isHTML(true); 
    $mail->Body    = "<b>Contact info.</b><br>"
    ."<p>Name: ".$name."</p>"
    ."<p>Email: ".$email."</p>"
    ."<p>Phone: ".$phone."</p>"
    ."<p>Message: ".$message."</p>";
    $mail->AddAddress( $recipient ); 
    $mail->CharSet = "UTF-8";

    $mail->Send();
} 
?>