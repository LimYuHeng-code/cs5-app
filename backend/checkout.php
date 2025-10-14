<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000"); // React dev server
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// DB connection
$conn = new mysqli("localhost", "root", "", "javajam");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Prices
$prices = [
    "Just Java" => 2.00,
    "Cafe au Lait" => ["Single" => 2.00, "Double" => 3.00],
    "Iced Cappuccino" => ["Single" => 4.75, "Double" => 5.75]
];

// Read JSON input from React
$data = json_decode(file_get_contents("php://input"), true);

$justJavaQty = isset($data['justJavaQuantity']) ? (int)$data['justJavaQuantity'] : 0;
$cafeQty = isset($data['cafeAuLaitQuantity']) ? (int)$data['cafeAuLaitQuantity'] : 0;
$cafeSize = isset($data['cafeSize']) ? $data['cafeSize'] : "";
$icedQty = isset($data['icedCappuccinoQuantity']) ? (int)$data['icedCappuccinoQuantity'] : 0;
$icedSize = isset($data['icedSize']) ? $data['icedSize'] : "";

// Validate sizes
if ($cafeQty > 0 && !in_array($cafeSize, ['Single', 'Double'])) {
    echo json_encode(["error" => "Invalid Cafe au Lait size"]);
    exit();
}
if ($icedQty > 0 && !in_array($icedSize, ['Single', 'Double'])) {
    echo json_encode(["error" => "Invalid Iced Cappuccino size"]);
    exit();
}

// Calculate totals
$justJavaTotal = $justJavaQty * $prices["Just Java"];
$cafeTotal = $cafeQty > 0 ? $cafeQty * $prices["Cafe au Lait"][$cafeSize] : 0;
$icedTotal = $icedQty > 0 ? $icedQty * $prices["Iced Cappuccino"][$icedSize] : 0;

// Insert orders (no prepared statements, for demo only)
if ($justJavaQty > 0) {
    $sql = "INSERT INTO orders (product_name, category, quantity, total_price) 
            VALUES ('Just Java', NULL, $justJavaQty, $justJavaTotal)";
    $conn->query($sql);
}

if ($cafeQty > 0) {
    $sql = "INSERT INTO orders (product_name, category, quantity, total_price) 
            VALUES ('Cafe au Lait', '$cafeSize', $cafeQty, $cafeTotal)";
    $conn->query($sql);
}

if ($icedQty > 0) {
    $sql = "INSERT INTO orders (product_name, category, quantity, total_price) 
            VALUES ('Iced Cappuccino', '$icedSize', $icedQty, $icedTotal)";
    $conn->query($sql);
}

$conn->close();

echo json_encode(["message" => "Order submitted successfully"]);
?>
