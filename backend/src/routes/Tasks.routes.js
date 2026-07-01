import { Router } from "express";

import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/Tasks.controller.js";

const router = Router();

router.route("/:taskId").patch(updateTask).get(getTaskById).delete(deleteTask);

router.route("/").post(createTask).get(getAllTasks);

export default router;
