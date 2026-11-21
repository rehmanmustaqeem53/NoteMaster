
import { useEffect, useState } from "react";
import { Search, Plus, NotebookText } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../utils/api";
import NoteCard from "../components/NoteCard";

export default function AllNotes() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const params = {};

      if (search.trim()) params.search = search.trim();
      if (category !== "All") params.category = category;

      const { data } = await api.get("/notes", { params });

      setNotes(data.notes);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to fetch notes"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNotes();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, category]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await api.delete(`/notes/${id}`);

      setNotes((prev) => prev.filter((note) => note._id !== id));

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

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            All Notes
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage and organize your personal notes.
          </p>
        </div>

        <Link
          to="/dashboard/create"
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700"
        >
          <Plus size={19} />
          Create Note
        </Link>

      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-3.5 text-gray-400"
            size={19}
          />

          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white outline-none"
        >
          <option value="All">All Categories</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="Ideas">Ideas</option>
          <option value="Other">Other</option>
        </select>

      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Loading notes...
        </div>
      ) : notes.length === 0 ? (

        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800">

          <NotebookText size={45} className="mx-auto text-indigo-500" />

          <h2 className="text-xl font-bold dark:text-white mt-4">
            No notes found
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first note or try another search.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

          {notes.map((note) => (
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
