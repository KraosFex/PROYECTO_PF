
import "./index.css";
import Home from "./components/home/home";
import Login from "./components/login/login";
import { Routes, Route } from "react-router-dom";


function App() {

  return (
    <div className="App-Body">
      <Routes>

        <Route path="/login" element={<Login />}/>

        <Route path="/home" element={<Home />}/>


      </ Routes>
    </ div>
  )
}

export default App;


  //  <Route path="/register" element={<Register />}/>
