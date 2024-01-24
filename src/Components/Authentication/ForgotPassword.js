// import React, { useState } from 'react';
// import { Card, Form, Button, Alert } from "react-bootstrap";
// import { Link, useNavigate} from "react-router-dom"


// function ForgotPassword() { 
  
//   const [email, setEmail] = useState("");
//   const [forgotPasswordError, setForgotPasswordError] = useState("");
//   const navigate = useNavigate();  
//   const [message, setMessage] = useState("")
 

//   const handleSubmit = (e) => {
//     e.preventDefault();


//     const formData = {
//       user: {
       
//         email: email,       
//       },
//     };

    
    
//     const response = fetch('https://ireporter-th6z.onrender.com/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         "accept": "application/json"        
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((user) => {
//         localStorage.setItem('token', response.headers.get("Authorization"))
//         if (user) {          
                    
//           setMessage('Logout Successful');
//           setTimeout(() => {
//             navigate('/');
//           }, 1234);
//         } else {
//             setForgotPasswordError(user.error);
//         }
//       })
//       .catch((error) => {
//         setForgotPasswordError('Signup failed');
//         console.error(error);
//       });
//   };

 

//   return (
//     <div>
//       <Card>
//         <Card.Body className='mx-auto'>
//           <h2 className='text-center mb-4'>Password Reset</h2>
//           <Form type="sumit" onSubmit={handleSubmit}>
//              {forgotPasswordError && <Alert variant="danger" className="SignupError">{forgotPasswordError}</Alert>}
//              {message && <Alert variant="success">{message}</Alert>}
//             <Form.Group id="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control className='w-80' type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
//             </Form.Group>  
//             <br/>         
//             <Button className='w-80' type="submit" onSubmit={handleSubmit}>Reset Password</Button>                      
//           </Form>
//           <div className='w-100 text-center mt-3'>
//             <Link to="/login">Login</Link>
//           </div>
//           <div className='w-100 text-center mt-2'>
//             Don't have an account? <Link to="/signup">Signup</Link>
//           </div>
//         </Card.Body>
//       </Card>
     
//     </div>
//   )
// }

// export default ForgotPassword;