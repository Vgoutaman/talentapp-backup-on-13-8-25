<?php
require 'config.php';

session_start(); // Ensure session is started

// Check if user is logged in by verifying session variables
if (!isset($_SESSION['userId'])) {
    echo json_encode(array("status" => "error", "message" => "User not logged in"));
    exit();
}

// Retrieve the logged-in user's ID
$userId = $_SESSION['userId'];

// Fetch the username from the database using the user ID
$sql = "SELECT username FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode(array(
        "status" => "success",
        "username" => $user['username']
    ));
} else {
    echo json_encode(array("status" => "error", "message" => "User not found"));
}

$stmt->close();
$conn->close();
?>
