
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  NotebookText,
  Star,
  CalendarDays,
  Plus,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import NoteCard from "../components/NoteCard";

export default function Dashboard() {
  const { user } = useAuth();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const { data } = await api.get("/notes");

      setNotes(data.notes);
    } catch (error) {
      toast.error("Unable to load dashboard notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const importantCount = notes.filter(
    (note) => note.isImportant
  ).length;

  const upcomingCount = notes.filter((note) => {
    if (!note.dueDate) return false;

    const due = new Date(note.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return due >= today;
  }).length;

  const stats = [
    {
      title: "Total Notes",
      value: notes.length,
      icon: NotebookText,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Important Notes",
      value: importantCount,
      icon: Star,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Upcoming Tasks",
      value: upcomingCount,
      icon: CalendarDays,
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await api.delete(`/notes/${id}`);

      setNotes((prev) =>
        prev.filter((note) => note._id !== id)
      );

      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Unable to delete note");
    }
  };

  const toggleImportant = async (note) => {
    try {
      const { data } = await api.put(`/notes/${note._id}`, {
        isImportant: !note.isImportant,
      });

      setNotes((prev) =>
        prev.map((item) =>
          item._id === note._id ? data.note : item
        )
      );

      toast.success("Note updated");
    } catch (error) {
      toast.error("Unable to update note");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}!
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Here's your personal workspace overview.
          </p>
        </div>

        <Link
          to="/dashboard/create"
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          <Plus size={19} />
          Create Note
        </Link>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">

        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-3 text-gray-900 dark:text-white">
                    {loading ? "..." : stat.value}
                  </h2>
                </div>

                <div className={`p-4 rounded-xl ${stat.color}`}>
                  <Icon size={25} />
                </div>

              </div>
            </motion.div>
          );
        })}

      </div>

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Recent Notes
        </h2>

        <Link
          to="/dashboard/notes"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-semibold"
        >
          View All
          <ArrowRight size={17} />
        </Link>

      </div>

      {loading ? (
        <p className="text-center py-12 text-gray-500">
          Loading notes...
        </p>
      ) : notes.length === 0 ? (

        <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-10 text-center">
          <NotebookText size={40} className="mx-auto text-indigo-500" />

          <h3 className="text-xl font-bold dark:text-white mt-4">
            No notes created yet
          </h3>

          <p className="text-gray-500 mt-2">
            Create your first note to get started.
          </p>

          <Link
            to="/dashboard/create"
            className="inline-flex mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white"
          >
            Create First Note
          </Link>
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

          {notes.slice(0, 6).map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={handleDelete}
              onToggleImportant={toggleImportant}
            />
          ))}

        </div>

      )}

    </div>
  );
}
