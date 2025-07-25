import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

import "./App.css";
import Drop from "./components/Drop";
import ViewDrop from "./components/ViewDrop";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navbar />
                <Home />
              </div>
            }
          />
          <Route
            path="/drop"
            element={
              <div>
                <Navbar />
                <Drop />
              </div>
            }
          />
          <Route
            path="/drop/:id"
            element={
              <div>
                <Navbar />
                <ViewDrop />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
