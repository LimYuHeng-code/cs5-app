import React from 'react';

function MenuPage() {
  return (
    <div className="content">
      <h2>Coffee at JavaJam</h2>
      <form action="checkout.php" method="post">
        <table border="0" id="centered">
          <tbody>
            <tr id="table-row-1">
              <td id="table-leftcol">Just Java</td>
              <td id="table-rightcol">
                Regular house blend, decaffeinated coffee, or flavour of the day.
                <br /><strong>Endless Cup $2.00</strong>
              </td>
              <td><input type="number" id="JavaQty" name="justJavaQuantity" defaultValue={0} /></td>
              <td><input type="text" id="JavaTotal" name="justJavaTotalPrice" defaultValue={0.0} /></td>
            </tr>
            <tr>
              <td id="table-leftcol">Cafe au Lait</td>
              <td id="table-rightcol">
                House blended coffee infused into a smooth, steamed milk.
                <br />
                <input type="radio" id="Qty_Cafe_Single" name="cafeSize" value="Single" defaultChecked />
                <strong>Single $2.00</strong>
                <input type="radio" id="Qty_Cafe_Double" name="cafeSize" value="Double" />
                <strong>Double $3.00</strong>
              </td>
              <td><input type="number" id="CafeQty" name="cafeAuLaitQuantity" defaultValue={0} /></td>
              <td><input type="text" id="CafeTotal" name="cafeAuLaitTotalPrice" defaultValue={0.0} /></td>
            </tr>
            <tr id="table-row-1">
              <td id="table-leftcol">Iced Cappuccino</td>
              <td id="table-rightcol">
                Sweetened espresso blended with icy-cold milk and served in chilled glass.
                <br />
                <input type="radio" id="IC_Single" name="icedSize" value="Single" defaultChecked />
                <strong>Single $4.75</strong>
                <input type="radio" id="IC_Double" name="icedSize" value="Double" />
                <strong>Double $5.75</strong>
              </td>
              <td><input type="number" id="IcedQty" name="icedCappuccinoQuantity" defaultValue={0} /></td>
              <td><input type="text" id="IcedTotal" name="icedCappuccinoTotalPrice" defaultValue={0.0} /></td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "right" }}>Total Price</td>
              <td colSpan="2">
                <input id="grandTotal" type="text" style={{ width: "100px", height: "20px" }} defaultValue={0.0} readOnly />
              </td>
            </tr>
          </tbody>
        </table>

        <input type="submit" value="Checkout" id="checkout" />
      </form>
    </div>
  );
}

export default MenuPage;

