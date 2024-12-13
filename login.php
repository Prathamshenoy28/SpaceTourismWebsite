<?php
// Start session
session_start();

// Establish connection to MySQL database
$servername = 'localhost';
$user = 'root';
$password = '';
$database = 'KJSCE';
$conn = mysqli_connect($servername, $user, $password, $database);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Handle login form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = $_POST['email'];
  $password = $_POST['password'];

  // Retrieve user data from database based on email
  $sql = "SELECT * FROM users WHERE email = '$email'";
  $result = mysqli_query($conn, $sql);

  if ($result && mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);

    // Verify password
    if (password_verify($password, $user['password'])) {
      // Password is correct, create session
      $_SESSION['user_id'] = $user['id'];
      $_SESSION['user_name'] = $user['name'];

      // Redirect to home page or any other page after successful login
      header("Location: index.html");
      exit;
    } else {
      // Invalid password, redirect to register.html
      header("Location: register.html");
      exit;
    }
  } else {
    // User not found, redirect to register.html
    header("Location: register.html");
    exit;
  }
}

// Close connection
mysqli_close($conn);
?>
