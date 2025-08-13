<?php
header('Content-Type: application/json');
include 'config.php'; // Include your database connection file

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    // Extract the username from the request
    $username = $input['username'] ?? '';

    if (empty($username)) {
        echo json_encode(['status' => 'error', 'message' => 'Username is required.']);
        exit;
    }

    try {
        // Query to fetch the company for the given username from the verified table
        $query = "SELECT company FROM verified WHERE username = ? LIMIT 1";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo json_encode(['status' => 'success', 'company' => $row['company']]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No company found for this user in the verified table.']);
        }

        $stmt->close();
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'An error occurred while fetching the company.', 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}

$conn->close();
?>
