
import { Link, useNavigate } from "react-router-dom";
import { NotebookPen, LogOut, Moon, Sun } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Unable to logout");
    }
  };

  return (
    <nav className="h-16 px-5 md:px-8 bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between sticky top-0 z-50">

      <Link to="/dashboard" className="flex items-center gap-2">
        <div className="bg-indigo-600 text-white p-2 rounded-lg">
          <NotebookPen size={22} />
        </div>

        <span className="text-xl font-bold text-gray-900 dark:text-white">
          NoteMaster
        </span>
      </Link>

      <div className="flex items-center gap-3">

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 dark:text-white"
          title="Toggle theme"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {user && (
          <>
            <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">
              {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400 px-3 py-2 rounded-lg hover:bg-red-100 transition"
            >
              <LogOut size={17} />
              <span className="hidden sm:block">Logout</span>
            </button>
          </>
        )}

      </div>
    </nav>
  );
}
