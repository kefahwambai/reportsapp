import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  "./topbar.css"



function Topbar() {

  return (
      <div>
          <nav className='topclass'>              
            <ul className='topul'>              
                <li className='topli'><Link to="#">Newsletter</Link></li>                 
                <li className='topli'><Link to="#">Careers</Link></li> 
                <li className='topli'><Link to="#">Tenders</Link></li>   
                <li className='topli'><Link to="#">Locate Us</Link></li>                                     
            </ul>         
          </nav>
      </div>
  )
}

export default Topbar