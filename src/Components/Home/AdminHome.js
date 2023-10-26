import React, { useState, useEffect } from 'react';
import './Home.css';
import Alert from '@mui/material/Alert';
import './admin.css';

function AdminHome(props) {
  const [issues, setIssues] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const user = props.user;
  const [showDescription, setShowDescription] = useState(false);
  const [currentDescription, setCurrentDescription] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    if (user) {
      
      Promise.all([fetch(`/redflags`), fetch(`/interventions`)])
        .then(([redflagsResponse, interventionsResponse]) =>
          Promise.all([redflagsResponse.json(), interventionsResponse.json()])
        )
        .then(([redflags, interventions]) => {
          
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
        })
        .catch((error) => {
          setError(error);
          console.error('Error fetching issues:', error);
        });
    }
  }, [user]);

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
        ? `/redflags/${issue.id}`
        : `/interventions/${issue.id}`;
  
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
