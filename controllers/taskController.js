import { Task } from "../models/Task.js";

//create new Task
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title || !priority || !dueDate) {
      return res
        .status(400)
        .json({ message: "Title, Priority and Due Date are required" });
    }

    const newTask = new Task({
      userId: req.user.id,
      title,
      description,
      priority,
      dueDate,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create task", err: err.message });
  }
};

//get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error in getTasks:", err);
    res.status(500).json({
      message: "Failed to fetch tasks",
      error: err.message,
    });
  }
};

//update Task
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update task",
      error: err.message,
    });
  }
};

//delete Task
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedTask) {
      return res.status(200).json({ message: "Task Deleted Successfully" });
    }

    res.status(200).json({ message: "Task delete Successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete task",
      error: err.message,
    });
  }
};
