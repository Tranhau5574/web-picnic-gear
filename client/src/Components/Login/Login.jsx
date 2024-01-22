import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import {Key, IdentificationCard} from "phosphor-react";
import "./Login.css"

function Login() {
  const history = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const openErrorModal = (message) => {
    setErrorMessage(message);
    setErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setErrorModalOpen(false);
  };

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        username,
        password,
      });

      const { data } = response;

      if (data.token) {
        localStorage.setItem("token", data.token);
        // Điều hướng đến trang chính
        history("/");
      } else {
        openErrorModal("Wrong credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      openErrorModal("An error occurred while logging in");
    }
  }

  return (
    <div className="page" style={{  }}>
    <form
      style={{ width: "300px", margin: "auto", marginTop: "50px" }}
      onSubmit={submit}
    >
      <h1>Login</h1>
      <div className="input_box">
      <label >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        
        />
        <IdentificationCard className ="icon" size={40} weight="fill" />
      </label>
      </div>
      <div className="input_box">
      <label >
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Key className ="icon" size={40} weight="fill" />
      </label>
      </div>

      <button className="btn"type="submit">Login</button>
      
      <div className="signup-link">
        <p style={{ display: "inline", marginRight: "5px" }}>
          Don't have an account?
        </p>
        <Link to="/signup" style={{ display: "inline" }}>
          <b>Signup</b>
        </Link>
      </div>
    </form>
    <Modal
        isOpen={errorModalOpen}
        onClose={closeErrorModal}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default Login;
