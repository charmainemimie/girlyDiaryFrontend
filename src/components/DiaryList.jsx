import { useEffect, useState } from "react";
import axios from "axios";

const DiaryList = () => {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    const { data } = await axios.get("http://localhost:5000/api/diary");
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-pink-700 text-center mb-4">Your Diary Entries</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map((entry) => (
          <div key={entry._id} className="p-4 bg-white shadow-md rounded-lg border border-pink-300">
            <h3 className="text-xl font-bold text-pink-600">{entry.title}</h3>
            <p className="text-gray-700">{entry.content}</p>
            <p className="text-sm text-gray-500 italic">{entry.mood}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
