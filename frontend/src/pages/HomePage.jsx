import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/NavBar.jsx";
import TaskCard from "../components/TaskCard.jsx";
import TaskForm from "../components/TaskForm.jsx";
import { taskService } from "../services/task.service.js";
import { toast } from "react-hot-toast";

function Home() {
  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // -----------------------------
  // FETCH TASKS
  // -----------------------------
  const fetchAllTasks = useCallback(async () => {
    try {
      const response = await taskService.getAllTasks();
      const tasks = response?.data;

      if (Array.isArray(tasks)) {
        setTasks(tasks);
      } else {
        setTasks([]);
        console.warn("Unexpected tasks format:", response);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  // -----------------------------
  // CREATE / UPDATE TASK
  // -----------------------------
  const handleSubmit = async (task) => {
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask._id, task);
        toast.success("Task updated!");
      } else {
        await taskService.createTask(task);
        toast.success("Task created successfully!");
      }

      setIsModalOpen(false);
      setEditingTask(null);
      fetchAllTasks();
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  // -----------------------------
  // DELETE TASK
  // -----------------------------
  const handleDelete = async (id) => {
    try {
      await taskService.deleteTask(id);
      toast.success("Task deleted!");
      fetchAllTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // -----------------------------
  // STATUS CHANGE
  // -----------------------------
  const handleStatusChange = async (id, status) => {
    try {
      await taskService.updateTask(id, { status });
      fetchAllTasks();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // -----------------------------
  // EDIT
  // -----------------------------
  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // -----------------------------
  // FILTER + SEARCH
  // -----------------------------
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "all" || task.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        onNewTask={() => {
          setEditingTask(null);
          setIsModalOpen(true);
        }}
      />

      {/* Task Grid */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {filteredTasks.length === 0 ? (
          <div className="text-center text-gray-500">No tasks found 📝</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      <TaskForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingTask}
      />
    </div>
  );
}

export default Home;
