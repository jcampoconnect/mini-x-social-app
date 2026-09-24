import { useState } from "react";
import { saveUser } from "./utils";
import { useNavigate } from "react-router-dom";
import "./new-main.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      setErrorMsg("All fields are required.");
      return;
    }

    const newUser = {
      id: Date.now(),
      email,
      username,
      password,
    };

    saveUser(newUser); 
    alert("Registration successful! Please login.");
    navigate("/"); 
  };

  return (
    <div className="register-container">
      <h2>Register New User</h2>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="register-form">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
