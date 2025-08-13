<?php
// Include PHPMailer for email functionality
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // This requires the PHPMailer library

// Get email from POST request
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['email']) && filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $userEmail = $data['email'];
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
    exit;
}

try {
    // Use fixed OTP
    $otp = 852581;

    // Initialize PHPMailer
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';  // Set the SMTP server to Gmail
    $mail->SMTPAuth = true;
    $mail->Username = 'gautambusiness123@gmail.com';  // Your email address
    $mail->Password = 'ircn wwsl icxp qcar';  // Your Gmail account password or app-specific password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Sender info
    $mail->setFrom('gautambusiness123@gmail.com', 'Talent App');
    $mail->addAddress($userEmail);

    // Email content
    $mail->isHTML(true);
    $mail->Subject = 'Your OTP for Verification';
    $mail->Body    = "Hello,<br><br>Your OTP for verification is: <b>$otp</b><br><br>Do not share this code with anyone.";

    $mail->send();

    // Respond with success
    echo json_encode(['status' => 'success', 'message' => 'OTP sent to your email!']);

    // Save the OTP in a secure storage (e.g., database or session)
    // Example: $_SESSION['otp'] = $otp;
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $mail->ErrorInfo]);
}
