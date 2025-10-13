import React, { useState } from 'react';

function PriceUpdate() {
const [formData, setFormData] = useState({
    justJava: false,
    cafeAuLait: false,
    icedCappucino: false,
    price_justjava: '',
    price_cafeaulait_single: '',
    price_cafeaulait_double: '',
    price_icedcappucino_single: '',
    price_icedcappucino_double: '',
});

const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
    }));
};

const validateForm = () => {
    let valid = true;
    const messages = [];

    // Just Java
    if (formData.justJava && formData.price_justjava.trim() === "") {
    messages.push("Please enter a new price for Just Java.");
    valid = false;
    }

    // Cafe au Lait
    if (
    formData.cafeAuLait &&
    formData.price_cafeaulait_single.trim() === "" &&
    formData.price_cafeaulait_double.trim() === ""
    ) {
    messages.push("Please enter at least one new price for Cafe au Lait.");
    valid = false;
    }

    // Iced Cappucino
    if (
    formData.icedCappucino &&
    formData.price_icedcappucino_single.trim() === "" &&
    formData.price_icedcappucino_double.trim() === ""
    ) {
    messages.push("Please enter at least one new price for Iced Cappucino.");
    valid = false;
    }

    if (!valid) {
    alert(messages.join("\n"));
    }

    return valid;
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Optional: Clean trimmed values before sending
    const cleanedFormData = Object.fromEntries(
    Object.entries(formData).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
    ])
    );

    console.log('Form submitted:', cleanedFormData);
    alert('Prices updated successfully!');
    // TODO: Send to backend via fetch or axios if needed
};

return (
    <div className="content">
    <h2>Click to update product prices:</h2>

    <form onSubmit={handleSubmit}>
        <table border="0" id="centered">
        <tbody>
            {/* Just Java */}
            <tr id="table-row-1">
            <td>
                <input
                type="checkbox"
                name="justJava"
                checked={formData.justJava}
                onChange={handleChange}
                />
            </td>
            <td id="table-leftcol">Just Java</td>
            <td id="table-rightcol">
                Regular house blend, decaffeinated coffee, or flavour of the day.<br />
                <strong>Endless Cup $2.00</strong><br />
                New Price: $
                <input
                type="number"
                name="price_justjava"
                placeholder="e.g. 2.00"
                value={formData.price_justjava}
                onChange={handleChange}
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
            <td id="table-leftcol">Cafe au Lait</td>
            <td id="table-rightcol">
                House blended coffee infused into a smooth, steamed milk.<br />
                <strong>Single $2.00, Double $3.00</strong><br />
                Single Price: $
                <input
                type="number"
                name="price_cafeaulait_single"
                min="0"
                placeholder="e.g. 2.00"
                value={formData.price_cafeaulait_single}
                onChange={handleChange}
                /><br />
                Double Price: $
                <input
                type="number"
                name="price_cafeaulait_double"
                min="0"
                placeholder="e.g. 3.00"
                value={formData.price_cafeaulait_double}
                onChange={handleChange}
                />
            </td>
            </tr>

            {/* Iced Cappucino */}
            <tr id="table-row-1">
            <td>
                <input
                type="checkbox"
                name="icedCappucino"
                checked={formData.icedCappucino}
                onChange={handleChange}
                />
            </td>
            <td id="table-leftcol">Iced Cappucino</td>
            <td id="table-rightcol">
                Sweetened espresso blended with icy-cold milk and served in chilled glass.<br />
                <strong>Single $4.75, Double $5.75</strong><br />
                Single Price: $
                <input
                type="number"
                step="0.05"
                min="0"
                name="price_icedcappucino_single"
                placeholder="e.g. 4.75"
                value={formData.price_icedcappucino_single}
                onChange={handleChange}
                /><br />
                Double Price: $
                <input
                type="number"
                step="0.05"
                min="0"
                name="price_icedcappucino_double"
                placeholder="e.g. 5.75"
                value={formData.price_icedcappucino_double}
                onChange={handleChange}
                />
            </td>
            </tr>
        </tbody>
        </table>

        <br />
        <input type="submit" value="Update Prices" />
    </form>
    </div>
);
}

export default PriceUpdate;
