import lightTheme from "./userCardLight.module.css";
import darkTheme from "./userCardDark.module.css";
import { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  isAdminConverter,
  deleteUser,
  getAllUsers,
} from "../../../../../redux/actions/index";
import BanearPopUp from "../PopUpBanear/BanearPopUp";
import { useState } from "react";

function UserCard({ id, name, username, email, isAdmin, image, courses }) {
  const dispatch = useDispatch();
  const [banearPopUp, setBanear] = useState(false);
  const token = useSelector((state) => state.reducerCompleto.authToken);
  const popUpFunction = (change) => {
    setBanear(change);
  };

  const deleteFunction = async () => {
    await dispatch(deleteUser({ userId: id, token }));
    dispatch(getAllUsers({ token }));
  };

  const adminFunction = async (e) => {
    if (e.target.name === "add_admin") {
      await dispatch(isAdminConverter({ userId: id, boolean: true, token }));
      dispatch(getAllUsers({ token }));
    } else if (e.target.name === "delete_admin") {
      await dispatch(isAdminConverter({ userId: id, boolean: false, token }));
      dispatch(getAllUsers({ token }));
    }
  };

  var style = darkTheme;
  const theme = useSelector((state) => state.reducerCompleto.theme);

  //SE TENDRIAN QUE CREAR LOS COMPONENETES POPUP PARA LA OPCION DE BANEAR

  return (
    <ThemeProvider
      theme={theme === "light" ? (style = lightTheme) : (style = darkTheme)}
      key={id}
    >
      <div className={style.cardContainer}>
        <div className={style.userIdentity}>
          <div className={style.imgContainer}>
            <img src={image} alt="profile" />
          </div>

          <div className={style.dataContainer}>
            <h1>{username}</h1>
            <h4>{name}</h4>
            <h4>{email}</h4>
            <h4>isAdmin: {isAdmin.toString()}</h4>
          </div>
        </div>
        <div className={style.userCourses}>
          <h2>Cursos:</h2>
          <div className={style.coursesContainer}>
            {courses.map((course) => (
              <h5 key={course.title}>{course.title}</h5>
            ))}
          </div>
        </div>
        <div className={style.adminOptions}>
          <button
            className={style.optionButton}
            onClick={() => popUpFunction(true)}
            name="ban"
          >
            Banear
          </button>
          <button
            className={style.optionButton}
            onClick={() => deleteFunction()}
            name="delete"
          >
            Eliminar
          </button>
          {isAdmin ? (
            <button
              className={style.optionButton}
              onClick={(e) => adminFunction(e)}
              name="delete_admin"
            >
              Quitar Admin
            </button>
          ) : (
            <button
              className={style.optionButton}
              onClick={(e) => adminFunction(e)}
              name="add_admin"
            >
              Hacer Admin
            </button>
          )}
          {banearPopUp ? (
            <BanearPopUp popUpFunction={popUpFunction} id={id} />
          ) : null}
        </div>
      </div>
    </ThemeProvider>
  );
}
export default UserCard;
