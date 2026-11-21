
import { motion } from "framer-motion";
import {
  Star,
  Trash2,
  Pencil,
  CalendarDays,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function NoteCard({ note, onDelete, onToggleImportant }) {
  const formattedDate = note.dueDate
    ? new Date(note.dueDate).toLocaleDateString()
    : "No due date";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-lg transition"
    >
      <div className="flex justify-between items-start gap-3">

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
          {note.category}
        </span>

        <button
          onClick={() => onToggleImportant(note)}
          title="Toggle importance"
          className="text-amber-500 hover:scale-110 transition"
        >
          <Star
            size={21}
            fill={note.isImportant ? "currentColor" : "none"}
          />
        </button>

      </div>

      <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4 break-words">
        {note.title}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 line-clamp-3 break-words">
        {note.description.replace(/<[^>]*>/g, " ").trim()}
      </p>

      <div className="flex items-center gap-2 text-xs text-gray-400 mt-5">
        <CalendarDays size={15} />
        {formattedDate}
      </div>

      <div className="flex items-center gap-2 border-t border-slate-100 dark:border-gray-800 mt-5 pt-4">

        <Link
          to={`/dashboard/notes/${note._id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 py-2 rounded-lg text-sm hover:bg-indigo-100 transition"
        >
          <Eye size={16} />
          View
        </Link>

        <Link
          to={`/dashboard/edit/${note._id}`}
          className="p-2 rounded-lg text-gray-500 hover:bg-slate-100 dark:hover:bg-gray-800"
          title="Edit note"
        >
          <Pencil size={17} />
        </Link>

        <button
          onClick={() => onDelete(note._id)}
          className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
          title="Delete note"
        >
          <Trash2 size={17} />
        </button>

      </div>
    </motion.div>
  );
}
