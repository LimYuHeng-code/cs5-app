// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active-page' : '';

  return (
    <nav>
      <ul>
        <li><Link to="/" className={isActive('/')}>Home</Link></li>
        <li><Link to="/menu" className={isActive('/menu')}>Menu</Link></li>
        <li><Link to="/music" className={isActive('/music')}>Music</Link></li>
        <li><Link to="/jobs" className={isActive('/jobs')}>Jobs</Link></li>
        {<li><Link to="/priceupdate" className={isActive('/priceupdate')}>Price Update</Link></li>}
        {<li><Link to="/salesreport" className={isActive('/salesreport')}>Sales Report</Link></li>}
    
  
      </ul>
    </nav>
  );
}

export default Navbar;
