import React, { useState } from 'react';

function SalesReport() {
  const [productChecked, setProductChecked] = useState(false);
  const [categoryChecked, setCategoryChecked] = useState(false);
  const [popularChecked, setPopularChecked] = useState(false);

  return (
    <div className="content" style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Click to generate daily sales report:</h2>

      <div>
        <input
          type="checkbox"
          id="product-checkbox"
          name="product"
          checked={productChecked}
          onChange={() => setProductChecked(!productChecked)}
        />
        <label htmlFor="product-checkbox" style={{ marginLeft: '8px' }}>
          Total dollar and quantity sales by product
        </label>
      </div>
      <br />

      <div>
        <input
          type="checkbox"
          id="category-checkbox"
          name="category"
          checked={categoryChecked}
          onChange={() => setCategoryChecked(!categoryChecked)}
        />
        <label htmlFor="category-checkbox" style={{ marginLeft: '8px' }}>
          Total dollar and quantity sales by categories
        </label>
      </div>
      <br />

      <div>
        <input
          type="checkbox"
          id="popular-checkbox"
          name="popular"
          checked={popularChecked}
          onChange={() => setPopularChecked(!popularChecked)}
        />
        <label htmlFor="popular-checkbox" style={{ marginLeft: '8px' }}>
          Popular option of best selling product
        </label>
      </div>
      <br />

      {productChecked && (
        <div id="product-report" style={{ border: '1px solid #ccc', padding: '10px' }}>
          <h3>Product Report</h3>
          <p>This is a placeholder for total dollar and quantity sales by product.</p>
        </div>
      )}

      {categoryChecked && (
        <div id="category-report" style={{ border: '1px solid #ccc', padding: '10px' }}>
          <h3>Category Report</h3>
          <p>This is a placeholder for total dollar and quantity sales by categories.</p>
        </div>
      )}

      {popularChecked && (
        <div id="popular-report" style={{ border: '1px solid #ccc', padding: '10px' }}>
          <h3>Popular Report</h3>
          <p>This is a placeholder for popular option of best selling product.</p>
        </div>
      )}
    </div>
  );
}

export default SalesReport;
