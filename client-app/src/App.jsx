import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { getCourses } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import style from "./index.modules.css";


import Home from "./components/home/home";
import Aside from "./components/home/aside/aside";
import NavBarUser from "./components/home/navbarUser/navBarUser";
import Login from "./components/login/login";
import Courses from "./components/courses/courses";
import Register from "./components/register/register";
import Landing from "./components/landing/landing";
import Perfil from "./components/perfil/perfil";
import PrivateRoute from "./components/privateRoute/privateRoute";
import CurseD from "./components/curseD/Curse";


function App() {
  const theme = useSelector((store) => store.theme);
  const isLogged = useSelector((store) => store.isLogged);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
  });



  const AppLayout = () => (
    <>
      <Aside theme={theme} />
      <NavBarUser theme={theme} />
      <Outlet />
    </>
  )

  return (
    <div className={style.AppBody}>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route element={<AppLayout />}>
          <Route path="/Home" element={<Home theme={theme} />} />
          <Route path="/courses" element={<Courses />}></Route>
          <Route element={<PrivateRoute isLogged={isLogged}/>}>
            <Route path="/Perfil" element={<Perfil />}/>
          </Route>
        </Route>
        <Route path="/Curse/:id" element={<CurseD />}/>
      </Routes>
    </div>
  )
}

export default App
