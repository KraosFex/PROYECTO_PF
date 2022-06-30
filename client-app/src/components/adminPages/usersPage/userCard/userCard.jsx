import lightTheme from "./userCardLight.module.css";
import darkTheme from "./userCardDark.module.css";
import { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  isAdminConverter,
  getAllUsers,
} from "../../../../../redux/actions";
import BanearPopUp from "../PopUpBanear/BanearPopUp";
import { useState } from "react";
import BanearDefini from "../PopUpBanear/BaneoDefinitivo";


function UserCard({ id, name, username, email, isAdmin, image, courses, estado }) {
  const dispatch = useDispatch();
  const [banearPopUp, setBanear] = useState(false);
  const [banearDefini, setBanearDef] = useState(false);

  const popUpFunction = (change, type) => {
    if (type === "ban") { setBanear(change) }
    if (type === "delete") { setBanearDef(change) }
    dispatch(getAllUsers())

  };

  const adminFunction = async (e) => {
    if (e.target.name === "add_admin") {
      await dispatch(isAdminConverter(id, true));
      dispatch(getAllUsers());
    } else if (e.target.name === "delete_admin") {
      await dispatch(isAdminConverter(id, false));
      dispatch(getAllUsers());
    }
  };

  var style = darkTheme;
  const theme = useSelector((store) => store.theme);

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
            onClick={() => popUpFunction(true, "ban")}
            name="ban"
          >
            Banear
          </button>
          <button
            className={style.optionButton}
            onClick={() => popUpFunction(true, "delete")}
            name="delete"
          >
            {estado? "Baneo Definitivo":"Quitar Baneo"}
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
          {banearPopUp ? (<BanearPopUp popUpFunction={popUpFunction} id={id} />) : null}
          {banearDefini ? estado?  <BanearDefini popUpFunction={popUpFunction} id={id} />: <BanearDefini popUpFunction={popUpFunction} id={id} cancel={true} />:null}
        </div>
      </div>
    </ThemeProvider>
  );
}
export default UserCard;
