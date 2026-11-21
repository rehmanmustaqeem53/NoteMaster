
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  NotebookText,
  Star,
  PlusCircle,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "All Notes",
    path: "/dashboard/notes",
    icon: NotebookText,
  },
  {
    name: "Important",
    path: "/dashboard/important",
    icon: Star,
  },
  {
    name: "Create Note",
    path: "/dashboard/create",
    icon: PlusCircle,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-[calc(100vh-64px)] bg-white dark:bg-gray-900 border-r border-slate-200 dark:border-gray-800 p-5 hidden md:block">

      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">
        Workspace
      </p>

      <div className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800"
                }`
              }
            >
              <Icon size={19} />
              <span className="font-medium text-sm">
                {link.name}
              </span>
            </NavLink>
          );
        })}
      </div>

      <div className="mt-12 p-4 bg-indigo-50 dark:bg-indigo-950 rounded-xl">
        <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">
          Stay Organized!
        </h3>

        <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2">
          Keep your ideas, tasks and important thoughts in one place.
        </p>
      </div>

    </aside>
  );
}
