<?php
if (ob_get_length()) ob_end_clean();

// Allow CORS for your frontend URL and handle OPTIONS preflight
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db_connect.php';

$response = [
    'success' => false,
    'message' => '',
    'products' => []
];

// Helper to sanitize and validate price input
function sanitizePrice($conn, $price) {
    $price = trim($price);
    if ($price === '' || !is_numeric($price)) return false;
    return $conn->real_escape_string($price);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read and decode JSON input for POST only
    $raw = file_get_contents('php://input');
    $input = json_decode($raw, true);

    if ($input === null && json_last_error() !== JSON_ERROR_NONE) {
        $response['message'] = "Invalid JSON input.";
        echo json_encode($response);
        exit();
    }

    $updatesCount = 0;

    // Just Java
    if (!empty($input['justJava']) && isset($input['price_justjava'])) {
        $price = sanitizePrice($conn, $input['price_justjava']);
        if ($price !== false) {
            $sql = "UPDATE products SET price_single = '$price' WHERE name = 'Just Java'";
            if ($conn->query($sql) === TRUE) $updatesCount++;
        }
    }

    // Cafe au Lait
    if (!empty($input['cafeAuLait'])) {
        if (isset($input['price_cafeaulait_single'])) {
            $price = sanitizePrice($conn, $input['price_cafeaulait_single']);
            if ($price !== false) {
                $sql = "UPDATE products SET price_single = '$price' WHERE name = 'Cafe au Lait'";
                if ($conn->query($sql) === TRUE) $updatesCount++;
            }
        }
        if (isset($input['price_cafeaulait_double'])) {
            $price = sanitizePrice($conn, $input['price_cafeaulait_double']);
            if ($price !== false) {
                $sql = "UPDATE products SET price_double = '$price' WHERE name = 'Cafe au Lait'";
                if ($conn->query($sql) === TRUE) $updatesCount++;
            }
        }
    }

    // Iced Cappuccino
    if (!empty($input['icedCappuccino'])) {
        if (isset($input['price_icedcappuccino_single'])) {
            $price = sanitizePrice($conn, $input['price_icedcappuccino_single']);
            if ($price !== false) {
                $sql = "UPDATE products SET price_single = '$price' WHERE name = 'Iced Cappuccino'";
                if ($conn->query($sql) === TRUE) $updatesCount++;
            }
        }
        if (isset($input['price_icedcappuccino_double'])) {
            $price = sanitizePrice($conn, $input['price_icedcappuccino_double']);
            if ($price !== false) {
                $sql = "UPDATE products SET price_double = '$price' WHERE name = 'Iced Cappuccino'";
                if ($conn->query($sql) === TRUE) $updatesCount++;
            }
        }
    }

    $response['success'] = true;
    $response['message'] = $updatesCount > 0
        ? "$updatesCount price(s) updated successfully!"
        : "No price changes detected.";
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Just a GET request to fetch products
    $response['success'] = true;
    $response['message'] = "Products fetched successfully.";
} else {
    $response['success'] = false;
    $response['message'] = "Unsupported request method.";
}

// Fetch products for both GET and POST responses so frontend can display current prices
$result = $conn->query("SELECT * FROM products");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $response['products'][] = [
            'name' => $row['name'],
            'price_single' => number_format($row['price_single'], 2),
            'price_double' => ($row['price_double'] !== null) ? number_format($row['price_double'], 2) : null,
        ];
    }
}

$conn->close();

echo json_encode($response);
exit();
