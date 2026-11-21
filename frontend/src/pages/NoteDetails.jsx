
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Star, CalendarDays } from "lucide-react";
import toast from "react-hot-toast";

import api from "../utils/api";

export default function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await api.get(`/notes/${id}`);
        setNote(data.note);
      } catch (error) {
        toast.error("Note not found");
        navigate("/dashboard/notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  if (loading) {
    return <div className="text-center py-20 dark:text-white">Loading...</div>;
  }

  if (!note) return null;

  return (
    <div className="max-w-4xl mx-auto">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6"
      >
        <ArrowLeft size={18} />
        Back to Notes
      </button>

      <article className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm p-6 md:p-10">

        <div className="flex justify-between items-center flex-wrap gap-3">

          <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 rounded-full text-sm">
            {note.category}
          </span>

          <div className="flex items-center gap-2">

            {note.isImportant && (
              <span className="flex items-center gap-1 text-amber-500 text-sm">
                <Star size={17} fill="currentColor" />
                Important
              </span>
            )}

            <Link
              to={`/dashboard/edit/${note._id}`}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              <Pencil size={16} />
              Edit
            </Link>

          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-8 break-words">
          {note.title}
        </h1>

        <div className="flex items-center gap-2 text-sm text-gray-400 mt-5 pb-6 border-b dark:border-gray-700">
          <CalendarDays size={17} />

          {note.dueDate
            ? `Due: ${new Date(note.dueDate).toLocaleDateString()}`
            : "No due date"}
        </div>

        <div
          className="prose dark:prose-invert prose-indigo max-w-none mt-8 break-words"
          dangerouslySetInnerHTML={{
            __html: note.description,
          }}
        />

      </article>
    </div>
  );
}
