import { useState } from "react";
import "./App.css";
import StockContext from "./context/StockContext";
import ThemeContext from "./context/ThemeContext";
import Dashboard from "./components/Dashboard";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("MSFT");

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <Dashboard/> 
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
