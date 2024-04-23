import React, { useState } from "react";

function CreateTask({ onCreate }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the task state up to the parent component or handle the API call directly here
    onCreate(task);
    setTask({ title: "", description: "" }); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Create Task</button>
    </form>
  );
}

export default CreateTask;
