import { Route, Routes} from "react-router";
import Home from "./components/home/home";
import Aside from "./components/home/aside/aside";
import Profile from "./components/home/profile/profile";
import Login from "./components/login/login";
import Curses from "./components/curses/curses";
import Register from "./components/register/register";
import Landing from "./components/landing/landing";
import { useSelector } from "react-redux";
import "./index.css";
import CurseD from "./components/curseD/Curse";


function App() {

  const theme = useSelector( store => store.theme);

  return (
    <div className="App-Body">
    <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />}/>
        <Route path ="/Register" element={<Register />} />
        <Route path="/Home" element={<Home theme={theme} />} />
        <Route path="/curses" element={<><Aside theme={theme}/><Profile theme={theme}/><Curses /></>}></Route>
        <Route path="/Curse/:id" element={<CurseD />}/>
    </Routes>
    </ div>
  )
}

export default App;


  //  <Route path="/register" element={<Register />}/>
