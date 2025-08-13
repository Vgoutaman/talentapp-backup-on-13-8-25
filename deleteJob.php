<?php
// Include the database connection file
require 'config.php';

// Start the session to get user information
session_start();

// Set headers for CORS
header('Access-Control-Allow-Origin: http://10.0.0.2'); // Replace with your app's origin
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');

// Check if the user is logged in and user_id exists in the session
if (!isset($_SESSION['userId'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'User not logged in.'
    ]);
    exit;
}

// Get the logged-in user's ID from the session
$userId = $_SESSION['userId'];

// Check if the job ID is provided in the request
if (!isset($_POST['jobId'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Job ID not provided.'
    ]);
    exit;
}

// Get the job ID from the request
$jobId = intval($_POST['jobId']);

// SQL query to delete the job posted by the user
$sql = "DELETE FROM `jobs` WHERE `id` = ? AND `user_id` = ?";

// Prepare and execute the query
if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("ii", $jobId, $userId); // Bind job ID and user ID

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Job deleted successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No job found or unauthorized action.']);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'SQL query failed: ' . $stmt->error
        ]);
    }

    $stmt->close();
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to prepare SQL statement.'
    ]);
}

// Close the database connection
$conn->close();
?>
