import React, { useState } from 'react'
import Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import {useNavigate, Link} from "react-router-dom"


function Signup() {
  const history = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/user/signup', {
        username,
        password,
      });
      history('/login');
    
    alert("Signup successful");
    }
      catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred while signup');
    // Call your API to create a new user
    // If successful, navigate to another page
    // navigate('/path-to-navigate');
  }
}

  return (
    <Form
      style={{ width: '300px', margin: 'auto', marginTop: '50px' }}
      onSubmit={submit}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <br />
      <p>Bạn đã có tài khoản ! </p>
      <Link to="/login"> Login</Link>
      <br />
    </Form>
  );
}

export default Signup