<?php
header('Content-Type: application/json');
include 'config.php'; // Your database connection file

$query = "SELECT * FROM testimonials ORDER BY created_at DESC";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    $testimonials = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $testimonials[] = $row;
    }
    echo json_encode(['status' => 'success', 'testimonials' => $testimonials]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No testimonials found.']);
}

mysqli_close($conn);
?>
