<?php
require 'config.php';

if (isset($_GET['token'])) {
    $token = $_GET['token'];

    // Check if token exists in the database
    $sql = "SELECT * FROM users WHERE verification_token = '$token'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verify the user by updating the database
        $update_sql = "UPDATE users SET verified = 1 WHERE verification_token = '$token'";
        if ($conn->query($update_sql) === TRUE) {
            echo "Email successfully verified! You can now log in.";
        } else {
            echo "Error verifying email.";
        }
    } else {
        echo "Invalid or expired token.";
    }
} else {
    echo "No token provided.";
}

$conn->close();
?>
