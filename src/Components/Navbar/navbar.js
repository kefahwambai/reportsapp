import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";

function Navbar({ user, handleLogout }) {
  const handleMakeReportClick = () => {
    if (user) {
     
    } else {      
      alert('Please login or register to make a report.');
     
    }
  };

  return (
    <div>
      <nav className='navbar'>
        <ul className='navul'>
          <li className='navli'><Link to="/">Home</Link></li>
          <li className='navli'><Link to="/about">About Us</Link></li>
          <li className='navli'><Link to="/legislation">Legislation</Link></li>
          {user ? (
            <li className='navli'><Link to="/home">Make a Report</Link></li>
          ) : (
            <li className='navli'><Link to="/login">Make a Report</Link></li>
          )}
          <li className='navli'><Link to="/news">News & Updates</Link></li>
          {user ? (
            <li className='navli' onClick={handleLogout}>Logout</li>
          ) : (
            <> </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
