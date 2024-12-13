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

// Handle booking form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Retrieve form data
  $name = mysqli_real_escape_string($conn, $_POST['name']);
  $email = mysqli_real_escape_string($conn, $_POST['email']);
  $number = mysqli_real_escape_string($conn, $_POST['number']);
  $destination = mysqli_real_escape_string($conn, $_POST['destination']);
  $cost = mysqli_real_escape_string($conn, $_POST['cost']);

  // Insert data into database
  $sql = "INSERT INTO `bookings` (`name`, `email`, `number`, `destination`, `cost`) VALUES ('$name', '$email', '$number', '$destination', '$cost')";
  if (mysqli_query($conn, $sql)) {
    // Booking successful, redirect to a success page
    header("Location: booking_success.php");
    exit; // Make sure to exit after redirecting
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }
} else {
  // Handle cases where the form is not submitted via POST method
  // For example, display an error message or redirect the user
  echo "Form submission method not allowed";
}

// Close connection
mysqli_close($conn);
?>
