import React, { useState } from "react";

function MenuPage() {
  const [formData, setFormData] = useState({
    justJavaQuantity: 0,
    cafeAuLaitQuantity: 0,
    cafeSize: "Single",
    icedCappuccinoQuantity: 0,
    icedSize: "Single",
  });

  const [message, setMessage] = useState("");

  // Update state on input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // Submit form and POST to backend PHP
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/IE4727/Week9/CS5Additional/cs5-app/backend/checkout.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Order submitted successfully!");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
    }
  };

  return (
    <div className="content">
      <h2>Coffee at JavaJam</h2>
      <form onSubmit={handleSubmit}>
        <table border="0" id="centered">
          <tbody>
            <tr>
              <td>Just Java</td>
              <td>
                Regular house blend, decaffeinated coffee, or flavour of the day.
                <br />
                <strong>Endless Cup $2.00</strong>
              </td>
              <td>
                <input
                  type="number"
                  name="justJavaQuantity"
                  min="0"
                  value={formData.justJavaQuantity}
                  onChange={handleChange}
                />
              </td>
              <td>
                {/* You can compute totals on the client if you want */}
                ${(formData.justJavaQuantity * 2).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>Cafe au Lait</td>
              <td>
                House blended coffee infused into a smooth, steamed milk.
                <br />
                <label>
                  <input
                    type="radio"
                    name="cafeSize"
                    value="Single"
                    checked={formData.cafeSize === "Single"}
                    onChange={handleChange}
                  />
                  <strong>Single $2.00</strong>
                </label>
                <label style={{ marginLeft: "10px" }}>
                  <input
                    type="radio"
                    name="cafeSize"
                    value="Double"
                    checked={formData.cafeSize === "Double"}
                    onChange={handleChange}
                  />
                  <strong>Double $3.00</strong>
                </label>
              </td>
              <td>
                <input
                  type="number"
                  name="cafeAuLaitQuantity"
                  min="0"
                  value={formData.cafeAuLaitQuantity}
                  onChange={handleChange}
                />
              </td>
              <td>
                ${(
                  formData.cafeAuLaitQuantity *
                  (formData.cafeSize === "Single" ? 2.0 : 3.0)
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>Iced Cappuccino</td>
              <td>
                Sweetened espresso blended with icy-cold milk and served in chilled glass.
                <br />
                <label>
                  <input
                    type="radio"
                    name="icedSize"
                    value="Single"
                    checked={formData.icedSize === "Single"}
                    onChange={handleChange}
                  />
                  <strong>Single $4.75</strong>
                </label>
                <label style={{ marginLeft: "10px" }}>
                  <input
                    type="radio"
                    name="icedSize"
                    value="Double"
                    checked={formData.icedSize === "Double"}
                    onChange={handleChange}
                  />
                  <strong>Double $5.75</strong>
                </label>
              </td>
              <td>
                <input
                  type="number"
                  name="icedCappuccinoQuantity"
                  min="0"
                  value={formData.icedCappuccinoQuantity}
                  onChange={handleChange}
                />
              </td>
              <td>
                ${(
                  formData.icedCappuccinoQuantity *
                  (formData.icedSize === "Single" ? 4.75 : 5.75)
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>
                Total Price
              </td>
              <td style={{ fontWeight: "bold" }}>
                ${(
                  formData.justJavaQuantity * 2 +
                  formData.cafeAuLaitQuantity * (formData.cafeSize === "Single" ? 2 : 3) +
                  formData.icedCappuccinoQuantity * (formData.icedSize === "Single" ? 4.75 : 5.75)
                ).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit" style={{ marginTop: "10px" }}>
          Checkout
        </button>
      </form>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}

export default MenuPage;


