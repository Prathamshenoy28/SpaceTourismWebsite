<?php
$host = 'localhost';
$user = 'root';
$password = '1234';
$database = 'space';

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>