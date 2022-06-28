// Libraries
import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//actions redux
import { getCourses, getRanking } from "../redux/actions/index";

// compoents
import Home from "./components/home/home";
import Aside from "./components/home/aside/aside";
import NavBarUser from "./components/home/navbarUser/navBarUser";
import Login from "./components/login/login";
import Courses from "./components/courses/courses";
import Register from "./components/register/register";
import Landing from "./components/landing/landing";
import Perfil from "./components/perfil/perfil";
import PrivateRoute from "./components/privateRoute/privateRoute";
import PrivateAdminRoute from "./components/privateRoute/privateAdminRoute";
import CourseDetail from "./components/courseDetailPage/courseDetail.jsx";
import LessonPage from "./components/lessonPage/lessonPage";
import UsersPage from "./components/adminPages/usersPage/usersPage";
import PaymentGateway from "./components/paymentGateway/paymentGateway.jsx";
import Success from "../src/components/paymentGateway/success/success";

// styles
import style from "./index.modules.css";

function App() {
  const theme = useSelector((state) => state.reducerCompleto.theme);
  const isLogged = useSelector((state) => state.reducerCompleto.isLogged);
  const user = useSelector((state) => state.reducerCompleto.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRanking());
  }, [dispatch]);

  const AppLayout = () => (
    <>
      <Aside theme={theme} />
      <NavBarUser theme={theme} />
      <Outlet />
    </>
  );

  return (
    <div className={style.AppBody}>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home theme={theme} />} />
          <Route path="/courses" element={<Courses />}></Route>
          <Route path="/course/:id" element={<CourseDetail theme={theme} />} />
          <Route element={<PrivateRoute isLogged={isLogged} />}>
            <Route path="/perfil" element={<Perfil theme={theme} />} />
            <Route
              path="/course/:idCourse/:idLesson"
              element={<LessonPage />}
            />
            <Route path="/pay" element={<PaymentGateway />} />
            <Route path="/success" element={<Success />} />
          </Route>
          <Route element={<PrivateAdminRoute isAdmin={user.isAdmin} />}>
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
