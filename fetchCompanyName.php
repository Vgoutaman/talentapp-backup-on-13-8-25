<?php
require 'config.php'; // Replace with your actual database connection file

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'] ?? '';

if (empty($username)) {
    echo json_encode(['status' => 'error', 'message' => 'Username is required']);
    exit;
}

$query = "SELECT company FROM verified WHERE username = ?";
if ($stmt = $conn->prepare($query)) {
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($company);
    $stmt->fetch();
    $stmt->close();

    // Fix: Use $company instead of $companyName
    if (!empty($company)) {
        echo json_encode(['status' => 'success', 'company' => $company]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Company name not found']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to prepare statement']);
}
?>
