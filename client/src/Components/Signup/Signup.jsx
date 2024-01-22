import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { Key, IdentificationCard } from "phosphor-react";

function Signup() {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:5000/user/signup", {
        username,
        password,
      });
      history("/login");

      alert("Signup successful");
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred while signup");
      // Call your API to create a new user
      // If successful, navigate to another page
      // navigate('/path-to-navigate');
    }
  };
  return (
  <div className="page" style={{ display: "flex", alignItems: "center" }}>
      <form
        style={{ width: "300px", margin: "auto", marginTop: "50px" }}
        onSubmit={submit}
      >
        <h1>Signup</h1>
        <div className="input_box">
          <label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <IdentificationCard className="icon" size={40} weight="fill" />
          </label>
        </div>
        <div className="input_box">
          <label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Key className="icon" size={40} weight="fill" />
          </label>
        </div>
        <div className="input_box">
          <label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Key className="icon" size={40} weight="fill" />
          </label>
        </div>

        <button className="btn" type="submit">
          Signup
        </button>

        <div className="signup-link">
          <p style={{ display: "inline", marginRight: "5px" }}>
            Bạn đã có tài khoản !
          </p>
          <Link to="/login" style={{ display: "inline" }}>
            <b>Login</b>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
