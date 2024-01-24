import React from 'react';
import { Link } from 'react-router-dom';
import  "./logo.css"
import logo from '../../Assets/corruption.png'


function Logo() {
    

  return (
      <div>
          <nav className='logobar'>
            <a href="http:localhost:3000/">
             <img
                className='logo'
                src={logo}
                alt="iReporter"
              />
              <span className='logotxt'> 
                iReporter
              </span>                
            </a>                       
          </nav>
      </div>
  )
}

export default Logo