import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ExtractProvider } from "./context/ExtractProvider";
import NewReport from "./pages/NewReport";
import { IngredientsProvider } from "./context/IngredientsProvider";
import Overview from "./pages/Overview";
import Reports from "./components/Reports";
import { ProductsProvider } from "./context/ProductsProvider";
import WeeklyReport from "./components/WeeklyReport";
import GraphsIndex from "./components/GraphsIndex";
import { WeeksProvider } from "./context/WeeksProvider";

function App() {
  return (
    <main className="flex h-[100dvh] w-[100dsvw] flex-col items-center justify-center bg-zinc-100">
      <BrowserRouter>
        <IngredientsProvider>
          <ExtractProvider>
            <WeeksProvider>
              <ProductsProvider>
                <Routes>
                  <Route path="/overview" element={<Overview />}>
                    <Route index element={<GraphsIndex />} />
                    <Route path="relatorios" element={<Reports />} />
                    <Route
                      path="relatorios/:semanaId"
                      element={<WeeklyReport />}
                    />
                    <Route
                      path="produtos"
                      element={<p className="col-span-7">teste</p>}
                    />
                    <Route
                      path="ingredientes"
                      element={<p className="col-span-7">teste ingredientes</p>}
                    />
                  </Route>
                  <Route path="/novo-relatorio" element={<NewReport />} />
                </Routes>
              </ProductsProvider>
            </WeeksProvider>
          </ExtractProvider>
        </IngredientsProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
