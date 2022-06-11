import { Route, Routes } from "react-router";
import Home from "./components/home/home";
import Aside from "./components/home/aside/aside";
import NavBarUser from "./components/home/navbarUser/navBarUser";
import Login from "./components/login/login";
import Courses from "./components/courses/courses";
import Register from "./components/register/register";
import Landing from "./components/landing/landing";
import Perfil from "./components/perfil/perfil";
import PrivateRoute from "./components/privateRoute/privateRoute";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { useEffect } from "react";
import { getCourses } from "../redux/actions";
import { Outlet } from "react-router-dom";

function App() {
  const theme = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses());
  });
  
  const AppLayout = ({}) => (
    <>
      <Aside theme={theme} />
      <NavBarUser theme={theme} />
      <Outlet />
    </>
  );

  return (
    <div className="App-Body">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route element={<AppLayout />}>
          <Route path="/Home" element={<Home theme={theme} />} />
          <Route path="/courses" element={<Courses />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/Perfil" element={<Perfil />}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

//  <Route path="/register" element={<Register />}/>
