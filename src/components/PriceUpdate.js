import React, { useState, useEffect } from "react";

function PriceUpdate() {
  const [formData, setFormData] = useState({
    justJava: false,
    cafeAuLait: false,
    icedCappuccino: false,
    price_justjava: "",
    price_cafeaulait_single: "",
    price_cafeaulait_double: "",
    price_icedcappuccino_single: "",
    price_icedcappuccino_double: "",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Handle input changes (checkbox and inputs)
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Fetch product prices from backend (GET)
  const fetchProductPrices = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost/IE4727/Week9/CS5Additional/cs5-app/backend/price_update.php"
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data && data.products) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching product prices:", error);
      alert("Failed to fetch product prices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductPrices();
  }, []);

  // Validate form before submission
  const validateForm = () => {
    const errors = [];

    if (formData.justJava && formData.price_justjava.trim() === "") {
      errors.push("Enter a price for Just Java.");
    }

    if (
      formData.cafeAuLait &&
      formData.price_cafeaulait_single.trim() === "" &&
      formData.price_cafeaulait_double.trim() === ""
    ) {
      errors.push("Enter at least one price for Cafe au Lait.");
    }

    if (
      formData.icedCappuccino &&
      formData.price_icedcappuccino_single.trim() === "" &&
      formData.price_icedcappuccino_double.trim() === ""
    ) {
      errors.push("Enter at least one price for Iced Cappuccino.");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return false;
    }
    return true;
  };

  // Handle form submit (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {};

    if (formData.justJava) {
      payload.justJava = true;
      payload.price_justjava = formData.price_justjava.trim();
    }
    if (formData.cafeAuLait) {
      payload.cafeAuLait = true;
      payload.price_cafeaulait_single = formData.price_cafeaulait_single.trim();
      payload.price_cafeaulait_double = formData.price_cafeaulait_double.trim();
    }
    if (formData.icedCappuccino) {
      payload.icedCappuccino = true;
      payload.price_icedcappuccino_single = formData.price_icedcappuccino_single.trim();
      payload.price_icedcappuccino_double = formData.price_icedcappuccino_double.trim();
    }

    try {
      const res = await fetch(
        "http://localhost/IE4727/Week9/CS5Additional/cs5-app/backend/price_update.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const result = await res.json();
      console.log("Backend response:", result);
      alert(result.message || "No message from server.");

      if (result.success) {
        fetchProductPrices(); // Refresh product list after update
        // reset form
        setFormData({
          justJava: false,
          cafeAuLait: false,
          icedCappuccino: false,
          price_justjava: "",
          price_cafeaulait_single: "",
          price_cafeaulait_double: "",
          price_icedcappuccino_single: "",
          price_icedcappuccino_double: "",
        });
      }
    } catch (err) {
      console.error("Request error:", err);
      alert("An error occurred while updating prices.");
    }
  };

  return (
    <div className="content">
      <h2>Update Product Prices</h2>

      <form onSubmit={handleSubmit}>
        <table border="0" id="centered">
          <tbody>
            {/* Just Java */}
            <tr>
              <td>
                <input
                  type="checkbox"
                  name="justJava"
                  checked={formData.justJava}
                  onChange={handleChange}
                />
              </td>
              <td>Just Java</td>
              <td>
                Endless Cup $2.00 <br />
                New Price: $
                <input
                  type="number"
                  name="price_justjava"
                  placeholder="e.g. 2.00"
                  value={formData.price_justjava}
                  onChange={handleChange}
                  min="0"
                  
                  disabled={!formData.justJava}
                />
              </td>
            </tr>

            {/* Cafe au Lait */}
            <tr>
              <td>
                <input
                  type="checkbox"
                  name="cafeAuLait"
                  checked={formData.cafeAuLait}
                  onChange={handleChange}
                />
              </td>
              <td>Cafe au Lait</td>
              <td>
                Single $2.00, Double $3.00 <br />
                Single: $
                <input
                  type="number"
                  name="price_cafeaulait_single"
                  placeholder="e.g. 2.00"
                  value={formData.price_cafeaulait_single}
                  onChange={handleChange}
                  min="0"
                  
                  disabled={!formData.cafeAuLait}
                />
                <br />
                Double: $
                <input
                  type="number"
                  name="price_cafeaulait_double"
                  placeholder="e.g. 3.00"
                  value={formData.price_cafeaulait_double}
                  onChange={handleChange}
                  min="0"
                  
                  disabled={!formData.cafeAuLait}
                />
              </td>
            </tr>

            {/* Iced Cappuccino */}
            <tr>
              <td>
                <input
                  type="checkbox"
                  name="icedCappuccino"
                  checked={formData.icedCappuccino}
                  onChange={handleChange}
                />
              </td>
              <td>Iced Cappuccino</td>
              <td>
                Single $4.75, Double $5.75 <br />
                Single: $
                <input
                  type="number"
                  name="price_icedcappuccino_single"
                  placeholder="e.g. 4.75"
                  value={formData.price_icedcappuccino_single}
                  onChange={handleChange}
                  min="0"
                  step="0.05"
                  disabled={!formData.icedCappuccino}
                />
                <br />
                Double: $
                <input
                  type="number"
                  name="price_icedcappuccino_double"
                  placeholder="e.g. 5.75"
                  value={formData.price_icedcappuccino_double}
                  onChange={handleChange}
                  min="0"
                  step="0.05"
                  disabled={!formData.icedCappuccino}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <br />
        <input type="submit" value="Update Prices" />
      </form>

      <hr />

      <h3>Current Product Prices</h3>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>Product</th>
              <th>Single Price</th>
              <th>Double Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>${p.price_single}</td>
                <td>{p.price_double ? `$${p.price_double}` : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PriceUpdate;
