import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import * as Pages from "./pages";
import { WatchListContextProvider } from "./context/watchListContext";

function App() {
  return (
    <main className="container">
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            {/* route defines the rules  */}
            <Route path="/" element={<Pages.StockOverviewPage />} />

            {/* " :(nama variabel) ,adalah  dynamic variabel,nama 
        variable akan di referensikan  " */}
            <Route path="/detail/:symbol" element={<Pages.StockDetailPage />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
