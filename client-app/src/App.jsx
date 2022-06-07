
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import "./index.css";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path ="/Register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
