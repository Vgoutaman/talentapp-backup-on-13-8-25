<?php
header('Content-Type: application/json');
include 'config.php';
session_start();

if (!isset($_SESSION['userId'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

$user_id = $_SESSION['userId'];
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$name = $conn->real_escape_string($data['name']);
$location = $conn->real_escape_string($data['location']);
$job_title = $conn->real_escape_string($data['job_title']);
$portfolio = $conn->real_escape_string($data['portfolio']);
$skills = $conn->real_escape_string($data['skills']);
$experience = $conn->real_escape_string($data['experience']);
$job_history = $conn->real_escape_string($data['job_history']);
$social_media = $conn->real_escape_string($data['social_media']);
$mobile = $conn->real_escape_string($data['mobile']);
$country_code = $conn->real_escape_string($data['country_code']);
$industry = $conn->real_escape_string($data['industry']);
$looking_for_job = $data['lookingForJob'] === 'Yes' ? 'Yes' : 'No';

$sql = "INSERT INTO candidateprofile (user_id, Name, Location, `Job Title`, Portfolio, Skills, Experience, `Job History`, `Social Media`, Mobile, CountryCode, Industry, LookingForJob)
        VALUES ('$user_id', '$name', '$location', '$job_title', '$portfolio', '$skills', '$experience', '$job_history', '$social_media', '$mobile', '$country_code', '$industry', '$looking_for_job')
        ON DUPLICATE KEY UPDATE 
        Location='$location', `Job Title`='$job_title', Portfolio='$portfolio', Skills='$skills', Experience='$experience', 
        `Job History`='$job_history', `Social Media`='$social_media', Mobile='$mobile', CountryCode='$country_code', Industry='$industry', LookingForJob='$looking_for_job'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => 'Profile saved successfully']);
} else {
    echo json_encode(['error' => 'Error saving profile: ' . $conn->error]);
}

$conn->close();
?>
