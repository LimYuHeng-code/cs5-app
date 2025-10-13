// src/components/Home.js
import React from 'react';

function Home() {
  return (
    <div className="content">
      <h2>Follow the Winding Road to JavaJam</h2>
      <div id="content-left">
        <img src="/winding-road.png" id="floatleft" alt="Road" height="160px" />
      </div>
      <div id="flexed">
        <ul id="homeul">
          <li><img src="/coffee.gif" className="bullet-icon" alt="" /> Specialty Coffee and Tea</li>
          <li><img src="/coffee.gif" className="bullet-icon" alt="" /> Bagels, Muffins, and Organic Snacks</li>
          <li><img src="/coffee.gif" className="bullet-icon" alt="" /> Music and Poetry Readings</li>
          <li><img src="/coffee.gif" className="bullet-icon" alt="" /> Open Mic Night Every Friday</li>
        </ul>
        <div className="address">
          <div>54321 Route 42</div>
          <div>Ellison Bay, WI 54210</div>
          <div>888-555-8888</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
