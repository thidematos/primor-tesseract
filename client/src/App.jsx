import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ExtractProvider } from "./context/ExtractProvider";
import RenderPDF from "./pages/RenderPDF";
import NewReport from "./pages/NewReport";
import { IngredientsProvider } from "./context/IngredientsProvider";

function App() {
  return (
    <main className="flex h-[100dvh] w-[100dsvw] flex-col items-center justify-center bg-zinc-100">
      <BrowserRouter>
        <IngredientsProvider>
          <ExtractProvider>
            <Routes>
              <Route path="/" element={<RenderPDF />} />
              <Route path="/novo-relatorio" element={<NewReport />} />
            </Routes>
          </ExtractProvider>
        </IngredientsProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
