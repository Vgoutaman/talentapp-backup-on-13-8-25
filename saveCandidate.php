<?php
header('Content-Type: application/json');

// Include the config file for database connection
require 'config.php';

// Get the raw input data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$action = $data['action'] ?? 'save'; // Default action is 'save'
$user_id = $conn->real_escape_string($data['user_id']);

if ($action === 'unsave') {
    // Delete profile data from the `savedprofile` table
    $sql = "DELETE FROM savedprofile WHERE user_id = '$user_id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => 'Profile unsaved successfully']);
    } else {
        error_log('MySQL Error: ' . $conn->error);
        echo json_encode(['error' => 'Error unsaving profile: ' . $conn->error]);
    }
} else {
    // Prepare and sanitize input data for saving
    $name = $conn->real_escape_string($data['name']);
    $location = $conn->real_escape_string($data['location']);
    $job_title = $conn->real_escape_string($data['job_title']);
    $portfolio = $conn->real_escape_string($data['portfolio']);
    $skills = $conn->real_escape_string(json_encode($data['skills']));
    $experience = $conn->real_escape_string($data['experience']);
    $job_history = $conn->real_escape_string($data['job_history']);
    $social_media = $conn->real_escape_string($data['social_media']);

    // Insert profile data into the `savedprofile` table
    $sql = "INSERT INTO savedprofile (user_id, Name, Location, `Job Title`, Portfolio, Skills, Experience, `Job History`, `Social Media`)
            VALUES ('$user_id', '$name', '$location', '$job_title', '$portfolio', '$skills', '$experience', '$job_history', '$social_media')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => 'Profile saved successfully']);
    } else {
        error_log('MySQL Error: ' . $conn->error);
        echo json_encode(['error' => 'Error saving profile: ' . $conn->error]);
    }
}

$conn->close();


?>