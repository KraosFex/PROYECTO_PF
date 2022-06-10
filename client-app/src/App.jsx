import { Route, Routes} from "react-router";
import Home from "./components/home/Home";
import Aside from "./components/home/aside/Aside";
import Profile from "./components/home/profile/Profile";
import Login from "./components/login/Login";
import Curses from "./components/curses/Curses";
import Register from "./components/register/Register";
import Landing from "./components/landing/Landing";
import { useSelector } from "react-redux";
import "./index.css";


function App() {

  const theme = useSelector( store => store.theme);

  return (
    <div className="App-Body">
    <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />}/>
        <Route path ="/Register" element={<Register />} />
        <Route path="/Home" element={<Home theme={theme} />} />
        <Route path="/curses" element={<><Aside theme={theme}/><Profile theme={theme}/><Curses /></>}>
        </Route>
    </Routes>
    </ div>
  )
}

export default App;


  //  <Route path="/register" element={<Register />}/>
