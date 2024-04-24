// /models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: "Pending" }, // 'Pending', 'Complete'
    creator: { type: String },
    assignee: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
