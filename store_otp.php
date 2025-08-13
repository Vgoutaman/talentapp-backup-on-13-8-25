<?php
// Set headers for CORS and JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

// Include the database connection
require 'config.php';

// Get the JSON input
$data = json_decode(file_get_contents('php://input'), true);

// Validate the input
$username = $data['username'] ?? '';
$otp = $data['otp'] ?? '';
$company = $data['company'] ?? ''; // Get the company name

if (!$username || !$otp || !$company) {
    echo json_encode(['status' => 'error', 'message' => 'Username, OTP, and Company are required.']);
    exit;
}

// Begin a transaction
$conn->begin_transaction();

try {
    // Insert the OTP, username, and company into the verified table
    $sqlVerified = "INSERT INTO verified (username, otp, company) VALUES (?, ?, ?)";
    $stmtVerified = $conn->prepare($sqlVerified);
    $stmtVerified->bind_param('sss', $username, $otp, $company);
    
    if (!$stmtVerified->execute()) {
        throw new Exception('Failed to store OTP and company name.');
    }

    // Insert the same data into the users table (without manually setting is_verified)
    $sqlUsers = "UPDATE users SET company = ? WHERE username = ?";
    $stmtUsers = $conn->prepare($sqlUsers);
    $stmtUsers->bind_param('ss', $company, $username);
    
    if (!$stmtUsers->execute()) {
        throw new Exception('Failed to update company in users table.');
    }

    // Commit the transaction
    $conn->commit();

    echo json_encode(['status' => 'success', 'message' => 'OTP and company name stored, and user verified successfully.']);

    // Close the statements
    $stmtVerified->close();
    $stmtUsers->close();
} catch (Exception $e) {
    // Rollback the transaction on error
    $conn->rollback();
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

// Close the database connection
$conn->close();
?>
