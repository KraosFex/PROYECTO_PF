import { useState } from "react";
import { useSelector } from "react-redux";

// import shildren components
import YourCourse from "./yourCourse/yourCourse";
import UsernamePopUp from "./popUps/usernamePopUp.jsx";
import PasswordPopUp from "./popUps/passwordPopUp.jsx";
import ImagePopUp from "./popUps/imagePopUp";

// import stiles
import darkTheme from "./perfilDark.module.css";
import lightTheme from "./perfilLight.module.css";

import JSIcon from "../../icons/javascript";
import { ThemeProvider } from "styled-components";

const Perfil = (props) => {
  var style = darkTheme;
  const [usernamePopUp, setUsernamePopUp] = useState(false);
  const [passwordPopUp, setPasswordPopUp] = useState(false);
  const [imagePopUp, setImagePopUp] = useState(false);

  const user = useSelector((state) => state.reducerCompleto.user);

  const popUpFunction = (specification, bool) => {
    if (specification === "password") setPasswordPopUp(bool);
    else if (specification === "username") setUsernamePopUp(bool);
    else if (specification === "image") setImagePopUp(bool);
  };
  var tipoUsuario = "normal";
  if (user.isPremium) tipoUsuario = "Premium";
  const coursesAll = user.courses.map((courseObj) => {
    return (
      <ThemeProvider
        theme={
          props.theme === "light" ? (style = lightTheme) : (style = darkTheme)
        }
      >
        <div className={style.cartYourCourse} key={courseObj.course._id}>
          <label className={style.cursos}> {courseObj.course.titulo} </label>
          <label className={style.cursos}>
            {courseObj.favorito === true ? "FAVORITO" : "NO AGREGADO"}
          </label>
          <label className={style.cursos1}> {courseObj.lessons.length} </label>
          <label className={style.cursos1}>
            {
              courseObj.lessons.filter((lesson) => lesson.isCompleted === true)
                .length
            }
          </label>
          <div className={style.lenguaje}>
            <JSIcon lenguajes={courseObj.course.lenguaje} />
          </div>
        </div>
      </ThemeProvider>
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
            <div className={style.flexResponsive}>
              <div className={style.containerImg}>
                <img
                  className={style.imgPerfil}
                  src={user.Image}
                  alt="aqui va un imagen"
                  referrerPolicy="no-referrer"
                />
                <button
                  className={style.imgChanger}
                  onClick={() => popUpFunction("image", true)}
                >
                  cambiar
                </button>
              </div>
              <div className={style.userDetail}>
                <div className={style.userFlex}>
                  <div className={style.Username}>
                    <span>{user.username}</span>
                  </div>
                  <div className={style.popupButtons}>
                    <button
                      className={style.popup}
                      onClick={() => popUpFunction("username", true)}
                    >
                      Editar usuario
                    </button>
                    <button
                      className={style.popupPassword}
                      onClick={() => popUpFunction("password", true)}
                    >
                      Cambiar Contraseña
                    </button>
                  </div>
                </div>
              </div>
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
                <div>
                  <label> Usuario: </label>
                  <span> {tipoUsuario} </span>
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

          {/* YOUR_COURSE   */}
          <YourCourse className={style.YourCourse} coursesAll={coursesAll} />

          {/* Condition Open pop up and Close pop up*/}
          {usernamePopUp ? (
            <UsernamePopUp popUpFunction={popUpFunction} id={user._id} />
          ) : null}
          {passwordPopUp ? (
            <PasswordPopUp popUpFunction={popUpFunction} email={user.email} />
          ) : null}
          {imagePopUp ? (
            <ImagePopUp popUpFunction={popUpFunction} email={user.email} />
          ) : null}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Perfil;
