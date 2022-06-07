import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import "./index.css";
import Home from "./pages/home";
import Landing from "./pages/landing/Landing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="Home" element={<Home />} />
        <Route path ="Register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
