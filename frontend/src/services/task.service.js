import api from "../api/axios.js";

export const taskService = {
  createTask: (data) => api.post(`/v1/tasks`, data),
  updateTask: (taskId, data) => api.patch(`/v1/tasks/${taskId}`, data),
  deleteTask: (taskId) => api.delete(`/v1/tasks/${taskId}`),
  getTaskById: (taskId) => api.get(`/v1/tasks/${taskId}`),
  getAllTasks: () => api.get(`/v1/tasks`),
};
