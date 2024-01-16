import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';

function Login() {
  const history = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        username,
        password,
      });

      const { data } = response;

      if (data.token) {
   
        localStorage.setItem('token', data.token);

        // Điều hướng đến trang chính
        history('/');
      } else {
        alert('Wrong credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in');
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
      <p>OR</p>
      <br />
      <Link to="/signup"> Signup</Link>
    </Form>
  );
}

export default Login;
