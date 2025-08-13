<?php
// Include the database connection file
require 'config.php';

// Start the session to get user information
session_start();

// Set headers for CORS
header('Access-Control-Allow-Origin: http://10.0.0.2'); // Replace with your app's origin
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');

// Check if user is logged in and user_id exists in session
if (!isset($_SESSION['userId'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'User not logged in.'
    ]);
    exit;
}

// Get the logged-in user's ID from the session
$userId = $_SESSION['userId'];

// Query to fetch the username and is_verified status of the logged-in user
$sql = "SELECT username, is_verified FROM users WHERE id = ?";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("i", $userId);
    
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            echo json_encode([
                'status' => 'success',
                'username' => $user['username'],
                'is_verified' => $user['is_verified'] // Return is_verified status
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'User not found']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'SQL query failed: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to prepare SQL statement.']);
}

// Close the database connection
$conn->close();
?>
