import React, { useState, useEffect } from 'react';
import './Home.css';
import Alert from '@mui/material/Alert';
import './admin.css';
import { useSelector } from "react-redux";

function AdminHome({user, setUser}) {
  const [issues, setIssues] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); 
  const [showDescription, setShowDescription] = useState(false);
  const [currentDescription, setCurrentDescription] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUserAndIssues = async () => {
      try {
        const userResponse = await fetch('http://localhost:3000/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userResponse.ok) {
          const fetchedUser = await userResponse.json();
          console.log('Current user:', fetchedUser);

          setUser(fetchedUser);

          const [redflagsResponse, interventionsResponse] = await Promise.all([
            fetch('http://localhost:3000/users/redflags', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            fetch('http://localhost:3000/users/interventions', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

          let redflags = [];
          let interventions = [];

          if (redflagsResponse.ok) {
            redflags = await redflagsResponse.json();
          }

          if (interventionsResponse.ok) {
            interventions = await interventionsResponse.json();
          }

          const redflagsWithType = redflags.map((redflag) => ({
            ...redflag,
            type: 'redflag',
          }));
          const interventionsWithType = interventions.map((intervention) => ({
            ...intervention,
            type: 'intervention',
          }));

          const allIssues = [...redflagsWithType, ...interventionsWithType];
          setIssues(allIssues);
        } else {
          console.error('Error fetching current user');
        }
      } catch (error) {
        console.error('Error fetching user and issues:', error);
        setError('Error fetching user and issues');
      }
    };

    fetchUserAndIssues();
  }, [user, setUser]);

  const handleEdit = (issue) => {
    setSelectedIssue(issue);
  };

  const handleStatusChange = (issue, event) => {
    const newStatus = event.target.value;
  
    if (!issue) {
      return;
    }
  
    const endpoint =
      issue.type === 'redflag'
        ? `https://ireporter-th6z.onrender.com/redflags/${issue.id}`
        : `https://ireporter-th6z.onrender.com/interventions/${issue.id}`;
  
    fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (response.ok) {
          setMessage('Status updated successfully');
          // Update the status of the specific issue
          const updatedIssues = issues.map((issueItem) => {
            if (issueItem.id === issue.id) {
              return { ...issueItem, status: newStatus };
            }
            return issueItem;
          });
          setIssues(updatedIssues);
        } else {
          setError('Error updating status');
        }
      })
      .catch((error) => {
        setError('Error updating status:', error);
      });
  };
  
  const showDescriptionPopup = (description) => {
    setCurrentDescription(description);
    setShowDescription(true);
  };

  const hideDescriptionPopup = () => {
    setShowDescription(false);
  };

  return (
    <div>
      <div className="adminhmepage">
        <div className="adminhmepgecontent">
          <h1>Welcome {user ? user.name : 'Guest'}</h1>
        </div>
        <div className="admindatatable">
          <table className="admintable table-hover">
            <thead>
              {message && typeof message === 'string' && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {message}
                </Alert>
              )}
              {error && typeof error === 'string' && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <tr className="tabler">
                <th scope="col">Title</th>
                <th scope="col">Status</th>
                <th scope="col">Location</th>
                <th scope="col">Reporters Name</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(issues) &&
                issues.map((issue, index) => (
                  <tr key={index}>
                    <td>
                      <a onClick={() => showDescriptionPopup(issue.description)}>{issue.title}</a>
                    </td>
                    <td>
                      {selectedIssue === issue ? (
                        <div>
                          <select onChange={handleStatusChange}>
                            <option value="under_investigation">Under Investigation</option>
                            <option value="rejected">Rejected</option>
                            <option value="resolved">Resolved</option>
                          </select>
                          <button onClick={(event) => handleStatusChange(issue, event)} className="update-button">
                            Update
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => handleEdit(issue)} className="edit-button">
                          Edit
                        </button>
                      )}
                    </td>
                    <td>{issue.location}</td>
                    <td>{issue.user.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {showDescription && (
            <div className="popup">
              <div className="popup-content">
                <span className="close" onClick={hideDescriptionPopup}>
                  &times;
                </span>
                <p>{currentDescription}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
