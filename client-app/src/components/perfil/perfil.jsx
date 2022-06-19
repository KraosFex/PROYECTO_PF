import { useSelector } from "react-redux";
import { useState } from "react";

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
  const persona = [
    {
      _id: "62a79b0eff516d849eb713d1",
      name: "Nombre",
      username: "Username",
      email: "example3@gmail.com",
      estado: true,
      isAdmin: true,
      Image:
        "https://www.clarin.com/img/2020/06/02/anonymous-el-grupo-habria-aparecido___6IQ8wCEUP_340x340__1.jpg",
      Member_Since: "14-06-2022",
      Last_Seen: "14-06-2022",
      courses: [
        {
          votes: [],
          id: "62a13a547863af74b03cf62b",
          titulo: "Curso 1",
          descripcion: "prueba",
          calificacion: 2000,
          imagen: "www.google.com",
          clases: [null],
          createdAt: "2022-06-09T00:09:56.086Z",
          updatedAt: "2022-06-09T00:09:56.086Z",
          lenguaje: "javascript",
          lessons: [],
          lecciones_Totales: 8,
          lecciones_Termidas: 5,
          favorito: true,
          userVotes: [],
        },
        {
          votes: [],
          id: "62a13b4b7863af74b03cf62e",
          titulo: "Curso 2",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
          calificacion: 2500,
          imagen: "www.google.com",
          clases: [null],
          createdAt: "2022-06-09T00:14:03.807Z",
          updatedAt: "2022-06-09T00:14:03.807Z",
          lenguaje: "css",
          lessons: [],
          userVotes: [],
          lecciones_Totales: 8,
          lecciones_Termidas: 5,
          favorito: true,
        },
        {
          votes: [],
          id: "62a13b4b7863af74b03cf62e",
          titulo: "Curso 3",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
          calificacion: 2500,
          imagen: "www.google.com",
          clases: [null],
          createdAt: "2022-06-09T00:14:03.807Z",
          updatedAt: "2022-06-09T00:14:03.807Z",
          lenguaje: "html",
          lessons: [],
          userVotes: [],
          lecciones_Totales: 8,
          lecciones_Termidas: 5,
          favorito: true,
        },
      ],
      createdAt: "2022-06-13T20:16:14.222Z",
      updatedAt: "2022-06-13T20:16:14.222Z",
    },
  ];

  const [usernamePopUp, setUsernamePopUp] = useState(false);
  const [passwordPopUp, setPasswordPopUp] = useState(false);

  const popUpFunction = (specification, bool) => {
    if (specification === "password") setPasswordPopUp(bool);
    else if (specification === "username") setUsernamePopUp(bool);
  };
  const coursesAll = persona[0].courses.map((course) => {
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
                src={persona[0].Image}
                alt="aqui va un imagen"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className={style.userDetail}>
              <div className={style.userFlex}>
                <div className={style.Username}>
                  <span>{persona[0].username}</span>
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
                    <span> {persona[0].name} </span>
                  </div>
                  <div>
                    <label> Email: </label>
                    <span> {persona[0].email} </span>
                  </div>
                </div>
                <div className={style.item}>
                  <div>
                    <label> Miembro desde:</label>
                    <span> {persona[0].Member_Since} </span>
                  </div>
                  <div>
                    <label> Visto por última vez: </label>
                    <span> {persona[0].Last_Seen} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* YOUR_COURSE   */}
          <YourCourse className={style.YourCourse} coursesAll={coursesAll} />

          {/* Condition Open pop up and Close pop up*/}
          {usernamePopUp ? (
            <UsernamePopUp popUpFunction={popUpFunction} id={persona.id} />
          ) : null}
          {passwordPopUp ? (
            <PasswordPopUp
              popUpFunction={popUpFunction}
              email={persona.email}
            />
          ) : null}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Perfil;
