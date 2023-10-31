import { use } from "chai";
import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";



function Redflags() {

  const [ title, setTitle ] = useState('');
  const [ location, setLocation] = useState('');
  const [ description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const sessionUser = useSelector((state) => state.session.user);
  const user = sessionUser ? sessionUser.id : '';

  function handleSubmit(event) {
    event.preventDefault();   
    console.log(location);
  
    const formData = new FormData();
  
    
    formData.append('title', title);
    formData.append('location', location);
    formData.append('description', description);    
    formData.append('user_id', user)
  
    console.log(formData);
  
    fetch('https://ireporter-vndn.onrender.com/redflags', {
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
        <h1>Report a Redflag!</h1>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input type="text" id="title" className="form-control" value={title} required onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="location">
            Location
          </label>
          <input type="text" id="location" className="form-control" value={location} required onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            rows="4"
            value={description} required onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-check d-flex justify-content-center mb-4">
          <input className="form-check-input me-2" type="checkbox" value="" id="form4Example4" defaultChecked />
          <label className="form-check-label" htmlFor="form4Example4">
            Send me a copy of this message
          </label>
        </div>


        {/* Submit button */}
        <button type="submit" className="btn btn-primary btn-block mb-4">Send</button>
      </form>
    </div>
  </div>


  )
}

export default Redflags;