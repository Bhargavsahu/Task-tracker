import {
  Pencil,
  Trash2,
  Clock3,
  CircleDashed,
  CheckCircle2,
  AlertTriangle,
  ArrowDown,
  Circle,
} from "lucide-react";

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const statusStyles = {
    Todo: "bg-gray-100 text-gray-700",
    isDoing: "bg-blue-100 text-blue-700",
    completed: "bg-emerald-100 text-emerald-700",
  };

  const priorityStyles = {
    high: "bg-red-100 text-red-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-green-100 text-green-700",
  };

  const StatusIcon = {
    Todo: Clock3,
    isDoing: CircleDashed,
    completed: CheckCircle2,
  }[task.status];

  const PriorityIcon = {
    High: AlertTriangle,
    Medium: Circle,
    Low: ArrowDown,
  }[task.priority];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
          {task.title}
        </h2>

        {/* Priority Badge */}
        <span
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${priorityStyles[task.priority]}`}
        >
          <PriorityIcon size={14} />
          {task.priority}
        </span>
      </div>

      {/* Status Badge */}
      <div className="mt-3 flex items-center gap-2">
        <span
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[task.status]}`}
        >
          <StatusIcon size={14} />
          {task.status === "isDoing" ? "In Progress" : task.status}
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-600 line-clamp-3">{task.description}</p>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-gray-400">
          {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : ""}
        </span>

        <div className="flex items-center gap-2">
          {/* Status dropdown */}
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            className="rounded-lg border border-gray-300 px-2 py-1 text-sm text-gray-700 outline-none hover:border-blue-500"
          >
            <option value="Todo">Todo</option>
            <option value="isDoing">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {/* Edit */}
          <button
            onClick={() => onEdit(task)}
            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100"
          >
            <Pencil size={18} />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(task._id)}
            className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
