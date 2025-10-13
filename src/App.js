// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MenuPage from './components/Menu';
import Music from './components/Music'; // <-- Uncomment when Music component is ready
 import Jobs from './components/Jobs'; // <-- Uncomment when Jobs component is ready
import PriceUpdate from './components/PriceUpdate'; // <-- Uncomment when PriceUpdate component is ready
import SalesReport from './components/SalesReport'; // <-- Uncomment when SalesReport component is ready

import './styles.css';

function App() {
  return (
    <Router>
      <div id="wrapper">
        <header>
          <img src="/header.png" id="centered" alt="JavaJam Header" width="500" />
        </header>
        <div className='main'></div>
        <div id="leftcolumn">
          <Navbar />
        </div>

        <div id="rightcolumn">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/music" element={<Music />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/priceupdate" element={<PriceUpdate />} />
            <Route path="/salesreport" element={<SalesReport />} />
          
          </Routes>
        </div>

        <footer>
          <small><i>© 2014 JavaJam Coffee House</i></small><br />
          <small><i>Email: <a href="mailto:lim@yuheng.com">lim@yuheng.com</a></i></small>
        </footer>
      </div>
    </Router>
  );
}

export default App;
