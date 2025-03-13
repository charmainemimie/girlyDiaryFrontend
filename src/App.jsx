import DiaryForm from "./components/DiaryForm";
import DiaryList from "./components/DiaryList";

function App() {
  return (
    <div className="bg-pink-50 min-h-screen flex flex-col items-center px-4">
      <h1 className="text-3xl font-bold text-pink-700 mt-6">🌸 My Digital Diary 🌸</h1>
      <DiaryForm refreshEntries={() => window.location.reload()} />
      <DiaryList />
    </div>
  );
}

export default App;
