import Chat from './components/Chat';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <div className="h-screen overflow-hidden flex flex-col items-center p-4 gap-4">
      <div className="flex w-full max-w-4xl justify-between items-center">
        <h1 className="text-2xl font-bold">LLM Chat Assistant</h1>
        <ThemeToggle />
      </div>
      <Chat />
    </div>
  );
}

export default App;
