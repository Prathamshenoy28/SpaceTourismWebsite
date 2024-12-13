<?php
session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $number = $_POST["number"];
    $destination = $_POST["destination"];
    $cost = $_POST["cost"];

    // Store booking details in session or database for further processing
    $_SESSION["booking_details"] = array(
        "name" => $name,
        "email" => $email,
        "number" => $number,
        "destination" => $destination,
        "cost" => $cost
    );

    // Redirect to ticket page
    header("Location: ticket.php");
    exit;
} else {
    // If form is not submitted, redirect to booking page
    console.log("Blah");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Booking Ticket</title>
    <!-- Include Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Booking Details</h5>
            </div>
            <div class="card-body">
                <?php
                // Check if booking details exist in session
                if (isset($_SESSION["booking_details"])) {
                    $booking = $_SESSION["booking_details"];
                    // Display booking details
                    echo "<p><strong>Name:</strong> {$booking["name"]}</p>";
                    echo "<p><strong>Email:</strong> {$booking["email"]}</p>";
                    echo "<p><strong>Number:</strong> {$booking["number"]}</p>";
                    echo "<p><strong>Destination:</strong> {$booking["destination"]}</p>";
                    echo "<p><strong>Total Cost:</strong> {$booking["cost"]}</p>";
                } else {
                    // If booking details do not exist, display error message
                    echo "<p>No booking details found.</p>";
                }
                ?>
            </div>
        </div>
    </div>
</body>
</html>
