import React, { useState,  useEffect } from 'react';
import "./Home.css";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";



function Home({user, setUser}) {
  const [issues, setIssues] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('')

  useEffect(() => {
    const storedToken = sessionStorage.getItem('jwt');
   
  
    if (user && user.user && user.user.id) {
      const userId = user.user.id;
      
  
      fetch(`http://localhost:3000/users/${userId}/redflags`)
        .then((response) => response.json())
        .then((redflags) => {
          fetch(`http://localhost:3000/users/${userId}/interventions`)
            .then((response) => response.json())
            .then((interventions) => {
              const allIssues = [...redflags, ...interventions];
              setIssues(allIssues);
            })
            .catch((error) => {
              console.error('Error fetching interventions:', error);
            });
        })
        .catch((error) => {
          setError(error);
          console.error('Error fetching redflags:', error);
        });
    }
  }, [user]);


  const handleEdit = (issueId) => {


  };

  const handleDelete = (issueId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');

    if (confirmDelete) {
      fetch(`http://localhost:3000/redflags/${issueId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {            
            setIssues(issues.filter((issue) => issue.id !== issueId));
            setMessage("Issue deleted")
          }
        })
        .catch((error) => {
          console.error('Error deleting record:', error);
        });
    }
  };


  return (
    <div>
      <div className="hmepage">
        <div className="hmepgecontent">
        <h1>Welcome {user ? user.user.name : "Guest"}</h1>
        </div>
        <div className="datatable">
          <table className="table table-hover">
            <thead>
            {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
              <tr className='tabler'>
                <th scope="col">Title</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(issues) && issues.map((issue, index) => (
                <tr key={index}>
                  <td>{issue.title}</td>
                  <td>{issue.status}</td>
                  <td>
                      <button className='hmpgebtn' onClick={() => handleEdit(issue.id)}>Edit</button>
                      <button className='hmpgebtn' onClick={() => handleDelete(issue.id)}>Delete</button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <button className="hmebtn">
            <Link to="/reports" className="nav-link">
              Report Incompetence/Corruption
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
