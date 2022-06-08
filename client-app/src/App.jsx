import "./index.css";
import React from "react";
import NavBar from "./Components/navbar/navBar";
import Home from "./pages/home";
import NavBarUser from "./Components/navbar/navBarUser";

function App() {
  return (
    <div className="App">
      <NavBar />
      <NavBarUser />
    </div>
  );
}

export default App;
