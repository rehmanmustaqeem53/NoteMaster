
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  NotebookPen,
  LayoutDashboard,
  FileText,
  Star,
  PlusCircle,
  Heart,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-100 text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* Brand */}
          <div>
            <Link
              to="/dashboard"
              className="mb-4 inline-flex items-center gap-2"
            >
              <div className="rounded-xl bg-indigo-600 p-2 text-white">
                <NotebookPen size={22} />
              </div>

              <span className="text-xl font-bold text-gray-900 dark:text-white">
                NoteMaster
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-6">
              Organize your thoughts, manage your tasks, and keep
              everything important in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 transition hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>

              <Link
                to="/dashboard/notes"
                className="flex items-center gap-2 transition hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <FileText size={16} />
                All Notes
              </Link>

              <Link
                to="/dashboard/important"
                className="flex items-center gap-2 transition hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Star size={16} />
                Important Notes
              </Link>

              <Link
                to="/dashboard/create"
                className="flex items-center gap-2 transition hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <PlusCircle size={16} />
                Create Note
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Stay Organized
            </h3>

            <p className="text-sm leading-6">
              Capture your ideas, save important information, and
              stay productive every day with NoteMaster.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-center text-sm dark:border-gray-800 sm:flex-row sm:text-left">
          <p>
            © {year} NoteMaster. All rights reserved.
          </p>

          <p className="flex items-center gap-1">
            Made with
            <Heart size={15} className="fill-red-500 text-red-500" />
            for productivity
          </p>
        </div>
      </div>
    </footer>
  );
}
