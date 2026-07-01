import { Plus, Search, Funnel } from "lucide-react";
function Navbar({ search, setSearch, filter, setFilter, onNewTask }) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-6">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Task Tracker
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Stay organized. Stay productive.
          </p>
        </div>

        {/* Controls */}
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          {/* New Task */}
          <button
            onClick={onNewTask}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition-all hover:bg-blue-700 hover:shadow-md"
          >
            <Plus size={18} />
            New Task
          </button>

          {/* Search */}
          <div className="relative flex-1 min-w-62.5 max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              placeholder="Search tasks..."
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Funnel
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-10 text-gray-700 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-500"
            >
              <option value="all">All Tasks</option>
              <option value="Todo">Todo</option>
              <option value="isDoing">isDoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
