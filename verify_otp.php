<?php
header('Content-Type: application/json');

// Get the verification token from the URL
if (isset($_GET['token'])) {
    $token = $_GET['token'];

    // Example verification logic
    $isValid = verifyTokenInDatabase($token);

    if ($isValid) {
        echo json_encode(['status' => 'success', 'message' => 'Email verified successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid verification token.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'No token provided.']);
}

function verifyTokenInDatabase($token) {
    $conn = new mysqli('localhost', 'root', '', 'your_database_name');

    if ($conn->connect_error) {
        die('Connection failed: ' . $conn->connect_error);
    }

    $stmt = $conn->prepare('SELECT id FROM users WHERE verification_token = ?');
    $stmt->bind_param('s', $token);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt = $conn->prepare('UPDATE users SET is_verified = 1 WHERE verification_token = ?');
        $stmt->bind_param('s', $token);
        $stmt->execute();

        return true;
    }

    return false;
}
?>