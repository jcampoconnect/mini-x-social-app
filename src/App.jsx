import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Feed from "./Feed";
import { useState } from "react";
import "./new-main.css";


function App() {
  const [username, setUsername] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !username ? (
              <Login onLogin={(name) => setUsername(name)} />
            ) : (
              <Feed username={username} />
            )
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
