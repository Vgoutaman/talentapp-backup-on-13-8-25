<?php
require 'config.php';

// Start the session
session_start();

// Check if the user is logged in
if (!isset($_SESSION['userId'])) {
    echo json_encode(array("status" => "error", "message" => "User not logged in"));
    exit();
}

// Get user ID from the session
$userId = $_SESSION['userId'];

// Get data from the POST request
$data = json_decode(file_get_contents("php://input"), true);

// Validate the input
if (!isset($data['username']) || !isset($data['email']) || !isset($data['password']) || !isset($data['profile_pic'])) {
    echo json_encode(array("status" => "error", "message" => "All fields are required"));
    exit();
}

$username = $data['username'];
$email = $data['email'];
$password = $data['password'];
$profilePic = $data['profile_pic'];

// Validation
if (empty($username) || empty($email) || empty($password)) {
    echo json_encode(array("status" => "error", "message" => "Please fill out all fields"));
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(array("status" => "error", "message" => "Please enter a valid email"));
    exit();
}

// Sanitize input
$username = $conn->real_escape_string($username);
$email = $conn->real_escape_string($email);
$password = $conn->real_escape_string($password);
$profilePic = $conn->real_escape_string($profilePic);

// Update the user data in the database
$sql = "UPDATE users SET username = ?, email = ?, password = ?, confirmpassword = ?, profile_pic = ? WHERE id = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("sssssi", $username, $email, $password, $password, $profilePic, $userId);

    if ($stmt->execute()) {
        echo json_encode(array("status" => "success", "message" => "User data updated successfully"));
    } else {
        echo json_encode(array("status" => "error", "message" => "Failed to update user data"));
    }

    $stmt->close();
} else {
    echo json_encode(array("status" => "error", "message" => "Failed to prepare the SQL statement"));
}

$conn->close();
?>
