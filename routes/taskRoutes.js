import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

//create task
router.post("/", verifyToken, createTask);
//get all tasks
router.get("/", verifyToken, getTasks);
//update task
router.patch("/:id", verifyToken, updateTask);
//delete task
router.delete("/:id", verifyToken, deleteTask);

export default router;
