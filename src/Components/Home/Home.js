import React, { useState,  useEffect } from 'react';
import "./Home.css";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";



function Home(props) {
  const [issues, setIssues] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('')
  const user = props.user;

  
  useEffect(() => {
    if (user) {
      // Fetch redflags for the user
      fetch(`/users/${user.id}/redflags`)
        .then((response) => response.json())
        .then((redflags) => {
          // Fetch interventions for the user
          fetch(`/users/${user.id}/interventions`)
            .then((response) => response.json())
            .then((interventions) => {
              // Combine redflags and interventions into a single array
              const allIssues = [...redflags, ...interventions];
              // Set the combined array in the state
              setIssues(allIssues);
            })
            .catch((error) => {
              console.error('Error fetching interventions:', error);
            });
        })
        .catch((error) => {
          setError(error)
          console.error('Error fetching redflags:', error);
        });
    }
  }, [user]);

  const handleEdit = (issueId) => {
    // Implement the logic to open an edit form and populate it with the issue's data.
    // When the user submits the form, send a PUT request to update the record.
  };

  const handleDelete = (issueId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');

    if (confirmDelete) {
      fetch(`/redflags/${issueId}`, {
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
        <h1>Welcome {user ? user.name : "Guest"}</h1>
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
