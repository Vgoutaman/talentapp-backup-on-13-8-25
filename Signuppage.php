<?php
require 'config.php';

// Start the session
session_start();  // Ensure session is started

// Get data from POST request
$data = json_decode(file_get_contents("php://input"));

// Check if the required properties exist
if (!isset($data->username) || !isset($data->email) || !isset($data->password) || !isset($data->confirmPassword)) {
    echo json_encode(array("status" => "error", "message" => "Please fill out all fields"));
    exit();
}

$userName = $data->username;
$email = $data->email;
$password = $data->password;
$confirmPassword = $data->confirmPassword;  // This will be received but not typically stored

// Validation
if (empty($userName) || empty($email) || empty($password) || empty($confirmPassword)) {
    echo json_encode(array("status" => "error", "message" => "Please fill out all fields"));
    exit();
}

if ($password !== $confirmPassword) {
    echo json_encode(array("status" => "error", "message" => "Passwords do not match"));
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(array("status" => "error", "message" => "Please enter a valid email"));
    exit();
}

// Check if email already exists
$sql = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(array("status" => "error", "message" => "Email already exists"));
    exit();
}

// Check if username already exists
$sql = "SELECT * FROM users WHERE username = '$userName'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(array("status" => "error", "message" => "Username already exists"));
    exit();
}

// Insert the user data into the database
$sql = "INSERT INTO users (username, email, password, confirmpassword) VALUES ('$userName', '$email', '$password', '$confirmPassword')";

if ($conn->query($sql) === TRUE) {
    // After successful signup, generate a unique verification token
    $verificationToken = bin2hex(random_bytes(16)); // 32-character token

    // Insert token into the database (to associate it with the user)
    $sql = "UPDATE users SET verification_token = '$verificationToken' WHERE email = '$email'";
    $conn->query($sql);

    // Send the verification email
    $subject = "Please verify your email address";
    $body = "Click the link below to verify your email:\n\n";
    $body .= "https://yourwebsite.com/verify-email.php?token=" . $verificationToken;  // Replace with your verify email endpoint

    $headers = "From: gautambusiness123@gmail.com";

    if (mail($email, $subject, $body, $headers)) {
        echo json_encode(array("status" => "success", "message" => "A verification email has been sent. Please check your inbox."));
    } else {
        echo json_encode(array("status" => "error", "message" => "Error sending verification email."));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Error: " . $conn->error));
}

$conn->close();
?>
