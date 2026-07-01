import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/Task.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";

const createTask = asyncHandler(async (req, res) => {
  // get title , description , priority from req.body

  const { title, description, priority } = req.body;

  if (!title?.trim()) {
    throw new apiError(400, "Title is required");
  }

  // create entry in db

  const task = await Task.create({
    title,
    description,
    priority,
  });

  if (!task) {
    throw new apiError(500, "something went wrong while creating task");
  }

  return res
    .status(201)
    .json(new apiResponse(201, task, "task created successfully"));
});

const getAllTasks = asyncHandler(async (req, res) => {
  // return all task in database
  const tasks = await Task.find();

  return res.status(200).json(new apiResponse(200, tasks, "all tasks fetched"));
});

const updateTask = asyncHandler(async (req, res) => {
  // get data to be updated

  if (!req.body) {
    throw new apiError(400, "Request body is required");
  }

  const { title, description, priority, status } = req.body;

  if (
    title === undefined &&
    description === undefined &&
    priority === undefined &&
    status === undefined
  ) {
    throw new apiError(400, "Provide at least one field to update");
  }

  const updateFields = {};

  if (title) updateFields.title = title;
  if (description) updateFields.description = description;
  if (priority) updateFields.priority = priority;
  if (status) updateFields.status = status;

  //get id of the task

  const taskId = req.params.taskId;

  if (!taskId) {
    throw new apiError(400, "no task to be updated");
  }

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new apiError(400, "invalid task id");
  }

  // find the task by id

  const updatedTask = await Task.findByIdAndUpdate(taskId, updateFields, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!updatedTask) {
    throw new apiError(404, "Task not found");
  }

  //give response

  return res
    .status(202)
    .json(new apiResponse(202, updatedTask, "task updated successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  // get task id

  const taskId = req.params.taskId;

  if (!taskId) {
    throw new apiError(400, "no task id provided");
  }

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new apiError(400, "invalid task id");
  }

  const removed = await Task.findByIdAndDelete(taskId);

  if (!removed) {
    throw new apiError(404, "task deletion failed");
  }

  return res
    .status(200)
    .json(new apiResponse(200, null, "Task deleted successfully"));
});

const getTaskById = asyncHandler(async (req, res) => {
  const taskId = req.params.taskId;

  if (!taskId) {
    throw new apiError(400, "no task id provided");
  }

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new apiError(400, "invalid task id");
  }

  const task = await Task.findById(taskId);

  if (!task) {
    throw new apiError(404, "No task found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, task, "task fetched successfully"));
});

export { createTask, getAllTasks, updateTask, deleteTask, getTaskById };
