import { useState } from "react";
import axios from "axios";

const DiaryForm = ({ refreshEntries }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("Happy");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://girlydiarybackend.onrender.com/notes", { title, content, mood });
    refreshEntries();
    setTitle("");
    setContent("");
    setMood("Happy")
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-pink-100 rounded-lg shadow-md max-w-2xl mx-auto w-full md:p-6"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border rounded text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border rounded my-3 text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        placeholder="Write your thoughts..."
      ></textarea>
      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="w-full p-3 border rounded text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
      >
        <option>Happy</option>
        <option>Sad</option>
        <option>Excited</option>
        <option>Angry</option>
        <option>Love</option>
      </select>
      <button
        type="submit"
        className="w-full bg-pink-500 text-white p-3 mt-3 rounded text-lg hover:bg-pink-600 transition-all"
      >
        Save Entry
      </button>
    </form>
  );
};

export default DiaryForm;
