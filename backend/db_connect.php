<?php
$servername = "localhost";
$username = "root";      // default username for local setup
$password = "";          // leave blank if no password
$dbname = "javajam";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>