import { Route, Routes } from "react-router-dom";



import Register from "./Components/Register/Register";
import "./index.css";
import Home from "./pages/home";
import Landing from "./pages/landing/Landing";
import NavBar from "./components/navbar/navBar";
import NavBarUser from "./components/navbar/navBarUser";
import { useSelector } from "react-redux";


function App() {
  const theme = useSelector((store) => store.theme);
  return (
    <div className="App">
    
      <NavBar theme={theme} />
      <NavBarUser theme={theme} />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/Home" element={<Home theme={theme} />} />
        <Route path="/Register" element={<Register />} />

      </Routes>
    </div>
  );
}

export default App;
