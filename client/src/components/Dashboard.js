import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";

function Dashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks"); // Replace with your actual API endpoint
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
        // Replace with your actual API endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        const addedTask = await response.json();
        setTasks([...tasks, addedTask]); // Add the new task to the current list
      } else {
        throw new Error("Failed to create task.");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Handler for updating an existing task
  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (response.ok) {
        const updatedTasks = tasks.map((task) =>
          task._id === taskId ? { ...task, ...updatedTask } : task
        );
        setTasks(updatedTasks); // Update the task list with the modified task
      } else {
        throw new Error("Failed to update task.");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handler for deleting a task
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        // Replace with your actual API endpoint
        method: "DELETE",
      });
      if (response.ok) {
        const remainingTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(remainingTasks); // Update the task list to remove the deleted task
      } else {
        throw new Error("Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.username}!</p>
      <button onClick={onLogout}>Logout</button>
      <CreateTask onCreate={handleCreateTask} />
      <TaskList
        tasks={tasks}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default Dashboard;
