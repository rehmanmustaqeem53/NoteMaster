
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";

import api from "../utils/api";
import TiptapEditor from "../components/TiptapEditor";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Personal",
    isImportant: false,
    dueDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await api.get(`/notes/${id}`);

        const note = data.note;

        setForm({
          title: note.title,
          description: note.description,
          category: note.category,
          isImportant: note.isImportant,
          dueDate: note.dueDate
            ? new Date(note.dueDate).toISOString().split("T")[0]
            : "",
        });
      } catch (error) {
        toast.error("Unable to load note");
        navigate("/dashboard/notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.description.replace(/<[^>]*>/g, "").trim()) {
      return toast.error("Please write your note");
    }

    try {
      setSaving(true);

      await api.put(`/notes/${id}`, {
        ...form,
        dueDate: form.dueDate || null,
      });

      toast.success("Note updated successfully!");

      navigate("/dashboard/notes");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update note"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 dark:text-white">
        Loading note...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Edit Note
      </h1>

      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Update your existing note.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-5 md:p-8 space-y-6"
      >

        <div>
          <label className="block font-medium mb-2 dark:text-white">
            Note Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            maxLength={150}
            required
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 dark:text-white">
            Description
          </label>

          <TiptapEditor
            value={form.description}
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                description: value,
              }))
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block font-medium mb-2 dark:text-white">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
              <option value="Work">Work</option>
              <option value="Ideas">Ideas</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2 dark:text-white">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

        </div>

        <label className="flex items-center gap-3 dark:text-white">
          <input
            type="checkbox"
            name="isImportant"
            checked={form.isImportant}
            onChange={handleChange}
            className="w-5 h-5 accent-indigo-600"
          />
          Mark as important
        </label>

        <div className="flex justify-end gap-3 border-t dark:border-gray-700 pt-6">

          <button
            type="button"
            onClick={() => navigate("/dashboard/notes")}
            className="px-5 py-3 border rounded-xl dark:border-gray-700 dark:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? "Updating..." : "Update Note"}
          </button>

        </div>

      </form>
    </div>
  );
}
