<?php
// Start session
session_start();

// Check if the user is logged in
$isLoggedIn = isset($_SESSION['user_id']);

// Return the login status as JSON
echo json_encode(['isLoggedIn' => $isLoggedIn]);
?>
