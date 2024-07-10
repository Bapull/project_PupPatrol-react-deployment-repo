import { BrowserView, MobileView } from "react-device-detect";
import React from "react";
import "./App.css";
import CategorySelect from "./pages/CategorySelect.jsx";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserView>
        <Link to="/categorySelect">카테고리</Link>
      </BrowserView>
      <MobileView>
        <Link to="/categorySelect">카테고리</Link>
      </MobileView>

      <BrowserRouter>
        <Routes>
          <Route
            path="/categorySelect"
            element={<CategorySelect />}
            exact={true}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
