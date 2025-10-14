<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow React dev server to access
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db_connect.php'; // Connect to database

$type = $_GET['type'] ?? 'product'; // Default to 'product' if no type specified

// Helper function to output HTML table header
function outputTableHeader($columns) {
    echo "<table border='1' cellpadding='8' cellspacing='0'><tr>";
    foreach ($columns as $col) {
        echo "<th>" . htmlspecialchars($col) . "</th>";
    }
    echo "</tr>";
}

if ($type === 'product') {
    $sql = "SELECT product_name, SUM(total_price) AS total_sales, SUM(quantity) AS total_qty 
            FROM orders 
            GROUP BY product_name 
            ORDER BY total_sales ASC";

    $result = $conn->query($sql);
    echo "<h2>Product Sales Report</h2>";
    outputTableHeader(['Product', 'Total Dollar Sales ($)', 'Quantity Sold']);

    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . htmlspecialchars($row['product_name']) . "</td>
                <td>$" . number_format($row['total_sales'], 2) . "</td>
                <td>" . intval($row['total_qty']) . "</td>
            </tr>";
    }
    echo "</table>";

} else if ($type === 'category') {
    $sql = "SELECT category, SUM(total_price) AS total_sales, SUM(quantity) AS total_qty 
            FROM orders 
            GROUP BY category 
            ORDER BY total_sales ASC";

    $result = $conn->query($sql);
    echo "<h2>Category Sales Report</h2>";
    outputTableHeader(['Category', 'Total Dollar Sales ($)', 'Quantity Sold']);

    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . htmlspecialchars($row['category']) . "</td>
                <td>$" . number_format($row['total_sales'], 2) . "</td>
                <td>" . intval($row['total_qty']) . "</td>
            </tr>";
    }
    echo "</table>";

} else if ($type === 'popular') {
    echo "<h2>Sales Interpretation Report</h2>";

    // Step 1: Get total sales and quantity for all products
    $sql = "SELECT product_name, SUM(total_price) AS total_sales, SUM(quantity) AS total_qty 
            FROM orders 
            GROUP BY product_name 
            ORDER BY total_sales ASC";

    $result = $conn->query($sql);
    $productNames = [];

    echo "<table border='1' cellpadding='8' cellspacing='0'>
            <tr style='background:#003366;color:white;'>
                <th>Product</th>
                <th>Total Dollar Sales</th>
                <th>Quantity Sales</th>
            </tr>";

    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . htmlspecialchars($row['product_name']) . "</td>
                <td>$" . number_format($row['total_sales'], 2) . "</td>
                <td>" . intval($row['total_qty']) . "</td>
            </tr>";
        $productNames[] = $row['product_name'];
    }
    echo "</table><br>";

    // Step 2: For each product (except 'Just Java'), show category breakdown
    foreach ($productNames as $product) {
        if ($product === 'Just Java') continue;

        $sql2 = "SELECT category, SUM(quantity) AS qty, SUM(total_price) AS total_sales 
            FROM orders 
                WHERE product_name = ? 
                GROUP BY category";

        $stmt = $conn->prepare($sql2);
        $stmt->bind_param('s', $product);
        $stmt->execute();
        $result2 = $stmt->get_result();

        $details = [];
        while ($row2 = $result2->fetch_assoc()) {
            $details[] = intval($row2['qty']) . " " . htmlspecialchars($row2['category']) . " ($" . number_format($row2['total_sales'], 2) . ")";
        }
        $stmt->close();

        if (!empty($details)) {
            echo "<p><b>" . htmlspecialchars($product) . "</b> – " . implode(", ", $details) . "</p>";
        }
    }

    // Step 3: Find best-selling product
    $bestProductSql = "SELECT product_name, SUM(total_price) AS total_sales 
                    FROM orders 
                    GROUP BY product_name 
                    ORDER BY total_sales DESC 
                    LIMIT 1";

    $bestResult = $conn->query($bestProductSql);
    $bestRow = $bestResult->fetch_assoc();
    $bestProduct = $bestRow['product_name'];

    // Step 4: Find most popular category for best-selling product
    $popularSql = "SELECT category, SUM(quantity) AS total_qty 
                FROM orders 
                WHERE product_name = ? 
                GROUP BY category 
                ORDER BY total_qty DESC 
                LIMIT 1";

    $stmt = $conn->prepare($popularSql);
    $stmt->bind_param('s', $bestProduct);
    $stmt->execute();
    $popularResult = $stmt->get_result();
    $popularRow = $popularResult->fetch_assoc();
    $popularCategory = $popularRow['category'] ?? 'N/A';
    $stmt->close();

    // Step 5: Display summary
    echo "<br><p style='font-size:16px;'>
            <span style='color:blue;'>Popular (with highest quantity sold) option (category)</span> of 
            <span style='color:red;'>best selling (highest $$) product</span> is 
            <b style='color:blue;'>" . htmlspecialchars($popularCategory) . "</b> of 
            <b style='color:red;'>" . htmlspecialchars($bestProduct) . "</b>.
        </p>";

} else {
    echo "<p>Invalid report type specified.</p>";
}

$conn->close();
?>
