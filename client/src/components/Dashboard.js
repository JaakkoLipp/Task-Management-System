import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";

function Dashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Handler for creating a new task
  const handleCreateTask = async (newTask) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        const addedTask = await response.json();
        setTasks([...tasks, addedTask]);
      } else {
        throw new Error("Failed to create task.");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Handler for deleting a task
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const remainingTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(remainingTasks);
      } else {
        throw new Error("Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <BrowserRouter>
      <div>
        {/* Define the application's routes */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>Dashboard</h1>
                <p>Welcome, {user.username}!</p>
                <button onClick={onLogout}>Logout</button>
                <Link to="/create-task">
                  <button>Create Task</button>
                </Link>
                <br />

                <TaskList tasks={tasks} onDelete={handleDeleteTask} />
              </div>
            }
          />
          {/* Link to navigate to the Create Task route */}
          <Route
            path="/create-task"
            element={<CreateTask onCreate={handleCreateTask} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Dashboard;
