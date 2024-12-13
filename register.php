<?php
// Establish connection to MySQL database
$servername = 'localhost';
$user = 'root';
$password = '';
$database = 'KJSCE';
$conn = mysqli_connect($servername, $user, $password, $database);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
} else {
  echo "Connection successful<br>";
}

// Handle registration form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $password = $_POST['password'];

  // Hash the password for security
  $hashed_password = password_hash($password, PASSWORD_DEFAULT);

  // Execute SQL query to insert data directly
  $sql = "INSERT INTO `users` (`username`, `email`, `password`) VALUES ('$name', '$email', '$hashed_password')";
  if (mysqli_query($conn, $sql)) {
    // Registration successful, redirect to login.html
    header("Location: login.html");
    exit; // Make sure to exit after redirecting
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }

  // Close connection
  mysqli_close($conn);
} else {
  // Handle cases where the form is not submitted via POST method
  // For example, display an error message or redirect the user
  echo "Form submission method not allowed";
}
?>
