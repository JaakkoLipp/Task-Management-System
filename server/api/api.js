const express = require("express");
const User = require("../models/User");
const Task = require("../models/Task");
const router = express.Router();

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().populate("creator");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new task
router.post("/tasks", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    creator: req.body.creator,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH /api/tasks/:id - Update a specific task
app.patch("/tasks/:id", async (req, res) => {
  const updates = req.body;
  const options = { new: true }; // This option returns the updated document

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updates,
      options
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/tasks/:id - Delete a specific task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
