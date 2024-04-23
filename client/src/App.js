import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import "./components/Login.css";
import Dashboard from "./components/Dashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check for logged-in user in local storage
    const loggedInUser = localStorage.getItem("currentUser");
    if (loggedInUser) {
      setCurrentUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <div className="App">
      {currentUser ? (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
