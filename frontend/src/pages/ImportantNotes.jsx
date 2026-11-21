
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";

import api from "../utils/api";
import NoteCard from "../components/NoteCard";

export default function ImportantNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImportantNotes = async () => {
    try {
      const { data } = await api.get("/notes", {
        params: { important: true },
      });

      setNotes(data.notes);
    } catch (error) {
      toast.error("Unable to fetch important notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImportantNotes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;

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
        isImportant: false,
      });

      setNotes((prev) =>
        prev.filter((item) => item._id !== data.note._id)
      );

      toast.success("Removed from important notes");
    } catch (error) {
      toast.error("Unable to update note");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">

      <div className="flex items-center gap-3 mb-8">

        <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
          <Star size={25} fill="currentColor" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Important Notes
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Quickly access your most important notes.
          </p>
        </div>

      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Loading important notes...
        </div>
      ) : notes.length === 0 ? (

        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800">
          <Star size={42} className="mx-auto text-amber-500" />

          <h2 className="text-xl font-bold dark:text-white mt-4">
            No important notes yet
          </h2>

          <p className="text-gray-500 mt-2">
            Mark a note as important to see it here.
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
