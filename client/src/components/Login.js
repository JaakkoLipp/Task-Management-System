import React, { useState, useEffect } from "react";

function Login({ onLogin }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/users") // Adjust this if your API endpoint differs
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <h1>Login</h1>
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
