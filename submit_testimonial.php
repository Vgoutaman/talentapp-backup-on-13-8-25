<?php
header('Content-Type: application/json');
include 'config.php'; // Your database connection file

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name']) || !isset($data['feedback'])) {
    echo json_encode(['status' => 'error', 'message' => 'Name and feedback are required.']);
    exit;
}

$name = mysqli_real_escape_string($conn, $data['name']);
$feedback = mysqli_real_escape_string($conn, $data['feedback']);
$image = "https://via.placeholder.com/50"; // Default image

$query = "INSERT INTO testimonials (name, text, image) VALUES ('$name', '$feedback', '$image')";
if (mysqli_query($conn, $query)) {
    echo json_encode(['status' => 'success', 'message' => 'Testimonial submitted successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to submit feedback.']);
}

mysqli_close($conn);
?>
