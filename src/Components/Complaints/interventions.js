import React, { useState, useEffect } from "react";
import "./intervention.css";
import Alert from "@mui/material/Alert";

function Intervention() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [agencies, setAgencies] = useState([]);
  const [government_agency, setGovernmentAgencies] = useState("");
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  
    console.log(government_agency);
    console.log(location);
  
    const formData = new FormData();
  
    formData.append('government_agency_id', government_agency); 
    formData.append('title', title);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('user_id', user)
  
    console.log(formData);
  
    fetch('https://ireporter.onrender.com/interventions', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage('Case Reported');
      })
      .catch((err) => {        
        setError(err.message);
      });
  }

  useEffect(() => {
    fetch('/me', {
      method: 'GET', 
      headers: {       
        'Content-type': 'application/json',
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok');
    })
    .then((data) => {               
      const user = data.id;
      setUser(user) 
      
        
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
  }, []);
  
  

  useEffect(() => {
    fetch("/government_agencies")
      .then((response) => response.json())
      .then((agencies) => {
        // Ensure agencies is an array before setting it
        if (Array.isArray(agencies)) {
          setAgencies(agencies);
        } else {
          setAgencies([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching agencies:", err);
      });
  }, []);

  return (
    <div>
      <div className="Interventionform">
        <form onSubmit={handleSubmit}>
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
          <h1>Raise a Government Intervention</h1>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="governmentAgency">
              Government Agency
            </label>
            <select
              id="governmentAgency"
              className="form-control"
              value={government_agency}
              
              onChange={(e) => setGovernmentAgencies(e.target.value)}
            >
              <option value="">Select an agency</option>
              {agencies.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              className="form-control"
              value={location}
              required
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="form-control"
              rows="4"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="image">
              Upload an image
            </label>
            <input
              type="file"
              id="image"
              className="form-control"
              accept="image/*"
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Intervention;
