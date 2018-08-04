<?php 
if(isset($_POST['submit'])) {
    $to = "josh.moaven@gmail.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $name = $_POST['name'];
    $subject = "Form submission";
    $message = $name . " wrote the following:" . "\n\n" . $_POST['message'];

    // $subject2 = "Copy of your form submission";
    // $message2 = "Here is a copy of your message " . $first_name . "\n\n" . $_POST['message'];

    $headers = "From:" . $from;
    mail($to, $subject, $message, $headers);

    // $headers2 = "From:" . $to;
    // mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender

    // echo "Thank you " . $name . ", I'll be in touch!";
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    // You cannot use header and echo together. It's one or the other.
}
?>