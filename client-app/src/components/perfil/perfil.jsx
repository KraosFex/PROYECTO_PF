import { useState } from "react";
import { useSelector } from "react-redux";

// import shildren components
import YourCourse from "./yourCourse/yourCourse";
import UsernamePopUp from "./popUps/usernamePopUp.jsx";
import PasswordPopUp from "./popUps/passwordPopUp.jsx";

// import stiles
import darkTheme from "./perfilDark.module.css";
import lightTheme from "./perfilLight.module.css";

import JSIcon from "../../icons/javascript";
import { ThemeProvider } from "styled-components";

const Perfil = (props) => {
  var style = darkTheme;
  const [usernamePopUp, setUsernamePopUp] = useState(false);
  const [passwordPopUp, setPasswordPopUp] = useState(false);

  const popUpFunction = (specification, bool) => {
    if (specification === "password") setPasswordPopUp(bool);
    else if (specification === "username") setUsernamePopUp(bool);
  };
  const coursesAll = user.courses.map((course) => {
    return (
      <div className={style.cartYourCourse} key={course.id}>
        <label className={style.cursos}> {course.titulo} </label>
        <label className={style.cursos}>
          {course.favorito === true ? "FAVORITO" : "NOT FAVORITO"}
        </label>
        <label className={style.cursos}> {course.lecciones_Totales} </label>
        <label className={style.cursos}> {course.lecciones_Termidas} </label>
        <div className={style.lenguaje}>
          <JSIcon lenguajes={course.lenguaje} />
        </div>
      </div>
    );
  });

  return (
    <ThemeProvider
      theme={
        props.theme === "light" ? (style = lightTheme) : (style = darkTheme)
      }
    >
      <div className={style.containerHeader}>
        <div className={style.containerPerfil}>
          <div className={style.perfilDates}>
            <div className={style.containerImg}>
              <img
                className={style.imgPerfil}
                src={user.Image}
                alt="aqui va un imagen"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className={style.userDetail}>
              <div className={style.userFlex}>
                <div className={style.Username}>
                  <span>{user.username}</span>
                </div>
                <button
                  className={style.popup}
                  onClick={() => popUpFunction("username", true)}
                >
                  Editar
                </button>
                <button
                  className={style.popupPassword}
                  onClick={() => popUpFunction("password", true)}
                >
                  Cambiar Contraseña
                </button>
              </div>
              <div className={style.flex}>
                <div className={style.item}>
                  <div>
                    <label> Name: </label>
                    <span> {user.name} </span>
                  </div>
                  <div>
                    <label> Email: </label>
                    <span> {user.email} </span>
                  </div>
                </div>
                <div className={style.item}>
                  <div>
                    <label> Miembro desde:</label>
                    <span> {user.Member_Since || "sin implementar"} </span>
                  </div>
                  <div>
                    <label> Visto por última vez: </label>
                    <span> {user.Last_Seen || "sin implementar"} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* YOUR_COURSE   */}
          <YourCourse className={style.YourCourse} coursesAll={coursesAll} />

          {/* Condition Open pop up and Close pop up*/}
          {usernamePopUp ? (
            <UsernamePopUp popUpFunction={popUpFunction} id={user._id} />
          ) : null}
          {passwordPopUp ? (
            <PasswordPopUp popUpFunction={popUpFunction} email={user.email} />
          ) : null}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Perfil;
