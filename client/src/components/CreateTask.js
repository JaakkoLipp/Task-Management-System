import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTask.css";

function CreateTask({ onCreate }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [task, setTask] = useState({
    title: "",
    description: "",
    creator: currentUser.username,
    assignee: currentUser.username,
    status: "pending",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onCreate(task);
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      setTask({
        title: "",
        description: "",
        creator: currentUser.username,
        assignee: currentUser.username,
        status: "pending",
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <br />
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateTask;
