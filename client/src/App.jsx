import UploadPDF from "./components/UploadPDF";
import { GeminiProvider, useGemini } from "./context/GeminiProvider";

function App() {
  return (
    <GeminiProvider>
      <main className="flex min-h-screen w-screen flex-col items-center justify-center">
        <UploadPDF />
      </main>
    </GeminiProvider>
  );
}

export default App;
