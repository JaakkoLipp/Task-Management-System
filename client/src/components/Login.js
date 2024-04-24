import React, { useState, useEffect } from "react";

function Login({ onLogin }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <h1>Task-Management-System</h1>
      <p>
        A web application where users can create assigned tasks, and track the
        team's work progress.
      </p>
      <h3>Login</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id} onClick={() => onLogin(user)}>
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Login;
