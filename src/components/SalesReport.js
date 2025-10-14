import React, { useState } from 'react';

const SalesReport = () => {
  const [productChecked, setProductChecked] = useState(false); //Update the state variable currently false 
  const [categoryChecked, setCategoryChecked] = useState(false);
  const [popularChecked, setPopularChecked] = useState(false);

  const [productReport, setProductReport] = useState('');//state variable to store the report content (initially empty), and a function to update it when data is fetched or cleared.
  const [categoryReport, setCategoryReport] = useState('');
  const [popularReport, setPopularReport] = useState('');

  //Fetches data from the server based on a given report type

  //Updates the UI using a React state setter

  //Handles errors gracefully if the fetch fails

  const fetchReport = async (type, setter) => {
    try {
      const response = await fetch(`http://localhost/IE4727/Week9/CS5Additional/cs5-app/backend/sales_report1.php?type=${type}`);
      if (!response.ok) throw new Error('Network error');
      const data = await response.text();
      setter(data);
    } catch (err) {
      setter(`<p style="color:red;">Failed to load ${type} report.</p>`);
      console.error(err);
    }
  };

  const handleProductChange = async (e) => {
    const checked = e.target.checked; //This extracts whether the checkbox is checked or not (true or false) from the event.
    setProductChecked(checked);//Update the state to checked
    if (checked) {
      await fetchReport('product', setProductReport); //show the report
    } else {
      setProductReport(''); //hide the report
    }
  };

  const handleCategoryChange = async (e) => {
    const checked = e.target.checked;
    setCategoryChecked(checked);
    if (checked) {
      await fetchReport('category', setCategoryReport);
    } else {
      setCategoryReport('');
    }
  };

  const handlePopularChange = async (e) => {
    const checked = e.target.checked;
    setPopularChecked(checked);
    if (checked) {
      await fetchReport('popular', setPopularReport);
    } else {
      setPopularReport('');
    }
  };

  return (
    <div className="content">
      <h2>Click to generate daily sales report:</h2>

      <div>
        <input
          type="checkbox"
          id="product-checkbox"
          checked={productChecked} //Update state
          onChange={handleProductChange} // Call the function
        />
        <label htmlFor="product-checkbox">Total dollar and quantity sales by product</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="category-checkbox"
          checked={categoryChecked}
          onChange={handleCategoryChange}
        />
        <label htmlFor="category-checkbox">Total dollar and quantity sales by categories</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="popular-checkbox"
          checked={popularChecked}
          onChange={handlePopularChange}
        />
        <label htmlFor="popular-checkbox">Popular option of best selling product</label>
      </div>

      {/* Report display areas */}
      <div style={{ marginTop: '20px' }}>
        {productChecked && (
          <div
            id="product-report"
            dangerouslySetInnerHTML={{ __html: productReport }} //inject raw HTML directly into the DOM inside a React component.
          />
        )}

        {categoryChecked && (
          <div
            id="category-report"
            dangerouslySetInnerHTML={{ __html: categoryReport }}
          />
        )}

        {popularChecked && (
          <div
            id="popular-report"
            dangerouslySetInnerHTML={{ __html: popularReport }}
          />
        )}
      </div>
    </div>
  );
};

export default SalesReport;

