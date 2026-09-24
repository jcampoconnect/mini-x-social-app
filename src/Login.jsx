import { useState, useEffect } from "react";
import { getUsers } from "./utils";
import "./new-main.css";


export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((loadedUsers) => setUsers(loadedUsers))
      .catch(() => setErrorMsg("Could not load user data"));
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      onLogin(matchedUser.username); 
    } else {
      setErrorMsg("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login Here!! - by: Julian Campo</h2>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        <p>Don’t have an account? <a href="/register">Register here</a></p>
      </form>
    </div>
  );
}
