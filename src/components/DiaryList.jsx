import { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const DiaryList = () => {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("Happy");
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch Notes
  const fetchEntries = async () => {
    const { data } = await axios.get(
      "https://girlydiarybackend.onrender.com/notes"
    );
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Add or Update Note
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      const { data } = await axios.put(
        `https://girlydiarybackend.onrender.com/notes/${editingId}`,
        { title, content, mood }
      );
      setEntries(entries.map((note) => (note._id === editingId ? data : note)));
      setEditingId(null);
      setShowForm(false);
    } else {
      const { data } = await axios.post(
        "https://girlydiarybackend.onrender.com/notes",
        { title, content, mood }
      );
      setEntries([...entries, data]);
    }
    setTitle("");
    setContent("");
    setMood("Happy")
  };

  // Open Edit Form
  const openEditForm = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setMood(note.mood);
    setEditingId(note._id);
    setShowForm(true);
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditingId(null);
    setShowForm(false);
    setTitle("");
    setContent("");
    setMood("Happy");
  };

  // Open Delete Modal
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // Confirm Delete
  const handleDelete = async () => {
    if (deleteId) {
      await axios.delete(
        `https://girlydiarybackend.onrender.com/notes/${deleteId}`
      );
      setEntries(entries.filter((note) => note._id !== deleteId));
      setShowModal(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-6">
      {/* Only show the form when editing */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 shadow-lg rounded-lg mb-6"
        >
          <h2 className="text-lg font-semibold text-pink-600">Edit Note</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-3 mb-3 border rounded text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option>Happy</option>
            <option>Sad</option>
            <option>Excited</option>
            <option>Angry</option>
            <option>Love</option>
          </select>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
            
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="w-xl">
        {entries.map((note) => (
          <div
            key={note._id}
            className="w-full bg-white p-6 rounded-lg shadow-lg mb-6 border border-pink-300"
          >
            <h2 className="text-2xl font-bold text-pink-600">{note.title}</h2>
             <h2 className="text-2xl font-bold text-pink-500">  Today I am {note.mood ? note.mood : "**feeling undefined"}</h2>
            <p className="text-gray-700 mt-2">{note.content}</p>

            <div className="flex gap-2 mt-4">
            <FaEdit
                onClick={() => openEditForm(note)}
                className="text-blue-500 w-8 hover:text-blue-700"
              />
          
           <MdDeleteForever
                onClick={() => openDeleteModal(note._id)}
                className="text-red-500 w-8 hover:text-red-700"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg">
              Are you sure you want to delete this note?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryList;
