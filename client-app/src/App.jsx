
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import "./index.css";


function App() {

  return (
    <div className="App-Body">
      <Routes>

        <Route path="/login" element={<Login />}/>
        <Route path ="/Register" element={<Register />} />
        <Route path="/home" element={<Home />}/>


      </ Routes>
    </ div>
  )
}

export default App;


  //  <Route path="/register" element={<Register />}/>
