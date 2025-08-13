<?php
require 'config.php';

// Start the session
session_start();

// Ensure user is logged in
if (!isset($_SESSION['email'])) {
    echo json_encode(array("status" => "error", "message" => "User not logged in."));
    exit();
}

// Get email from session
$email = $_SESSION['email'];

// Query to get the username for the logged-in email
$sql = "SELECT username FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode(array("status" => "success", "username" => $user['username']));
} else {
    echo json_encode(array("status" => "error", "message" => "No user found"));
}

$stmt->close();
$conn->close();
?>
