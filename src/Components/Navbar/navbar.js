import React from 'react';
import { Link } from 'react-router-dom';
import  "./navbar.css"



function Navbar() {
    

  return (
      <div>
          <nav className='navbar'>           
            <ul className='navul'>              
              <li className='navli'><Link to="/">Home</Link></li>
              <li className='navli'><Link to="/about">About Us</Link></li>
              <li className='navli'><Link to="/legislation">Legislation</Link></li>
              <li className='navli'><Link to="/repports">Make a Report</Link></li>
              <li className='navli'><Link to="/news">News & Updates</Link></li>
                                            
            </ul>
            
          
          </nav>
      </div>
  )
}

export default Navbar