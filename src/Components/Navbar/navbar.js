import React from "react";

import { Link } from 'react-router-dom';
import  "./navbar.css"
import { useNavigate } from "react-router-dom";


function Navbar({ user, setUser}) {

  const navigate = useNavigate(); 

    function handleLogoutClick() {
      fetch('https://ireporter.onrender.com/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }, }).then((r) => {
          if (r.ok) {
            setUser(null);
            navigate('/');
          }
        });
      }
    

    return (
        <div>
            <nav>
                
             <ul>
                {user ? (
                    <>
                    {user. isAdmin ? (
                      <Link to="/admin" />
                    ):(
                      <li><Link to="/admin">Home</Link></li>
                    )}                  
                    </>
                ): (
                    <>
                    <li><Link to="/">Home</Link></li>   
                    </>
                )}                             
             </ul>
              {user ? (
                <>
                <button className="btnn" onClick={handleLogoutClick}> Logout </button> 
                </>

              ): (
                <>
                    <button className="btnn"> <Link to="/login" className="nav-link">Login</Link> </button> 
                    <button className="btnn"> <Link to="/signup" className="nav-link">Signup</Link> </button>           

                </>
                
              )}
           
            </nav>
        </div>
    )
}

export default Navbar