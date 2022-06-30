import React from "react";
import darkTheme from "./homeDark.module.css";
import lightTheme from "./homeLight.module.css";
import { ThemeProvider } from "styled-components";
import codeLearnGold from "../../icons/codelearngold.png";
import { Link, NavLink } from "react-router-dom";
import Ranking from "./ranking/ranking";
import UserRank from "./userRank/userRank";
import { useSelector } from "react-redux";
import JSIcon from "../../icons/javascript.jsx";
import { AiFillHeart } from "react-icons/ai";

function Home(props) {
  const { courses, user } = useSelector((store) => store.reducerCompleto);

  let favoritos = user.courses
    ? user.courses.filter((e) => e.isFavorite).map((e) => e.course)
    : [];
  let style = props;

  return (
    <ThemeProvider
      theme={
        props.theme === "light" ? (style = lightTheme) : (style = darkTheme)
      }
    >
      <div className={style.flexContainer}>
        <div className={style.container}>
          <UserRank />
          <Ranking />
        </div>
        <div className={style.flexContainer2}>
          <div className={style.container2}></div>
          <div className={style.flexContainer3}>
            <div className={style.container31}>
              <img src={codeLearnGold} className={style.logoCont3} />
              <div className={style.container3Text}>
                <h3>Mejora a CodeLearn Gold ahora!</h3>
                <h1>
                  Ayuda a CodeLearn y obtiene mejoras como Pro stats,
                  Comparativas con otros usuarios y mas.
                </h1>
                <div className={style.button}>
                  <Link to="/pay">Ver mas</Link>
                </div>
              </div>
            </div>
            <div className={style.flexContainer4}>
              {favoritos.length ? (
                <h1 className={style.tit}>Favoritos</h1>
              ) : null}
              {favoritos
                ? favoritos
                    .map((course, i) => (
                      <div key={i} className={style.container3}>
                        <div className={style.flexContainerCard}>
                          <NavLink
                            to={`/course/${course._id}`}
                            className={style.courseName}
                          >
                            {course.titulo}
                          </NavLink>

                          <div className={darkTheme.lenguaje}>
                            <JSIcon lenguajes={course.lenguaje.toLowerCase()} />
                          </div>
                          <div className={style.courseStats}>
                            <AiFillHeart className={darkTheme.corazon} />
                            <div className={style.descripcion}>
                              <span>
                                Descripcion: {course.descripcion.slice(0, 150)}
                                {course.descripcion.slice(150, 151) ? (
                                  <NavLink
                                    to={`/course/${course._id}`}
                                    className={style.mas}
                                  >
                                    (...)
                                  </NavLink>
                                ) : null}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                    .slice(0, 2)
                : null}
              {courses.length ? (
                <h1 className={style.tit}>Cursos Recomendados </h1>
              ) : null}
              {courses
                ? courses
                    .map((course, i) => (
                      <div key={i} className={style.container3}>
                        <div className={style.flexContainerCard}>
                          <NavLink
                            to={`/course/${course._id}`}
                            className={style.courseName}
                          >
                            {course.titulo}
                          </NavLink>
                          <div className={darkTheme.lenguaje}>
                            <JSIcon lenguajes={course.lenguaje.toLowerCase()} />
                          </div>
                          <div className={style.courseStats}>
                            <div className={style.descripcion}>
                              <span>
                                Descripcion: {course.descripcion.slice(0, 150)}
                                {course.descripcion.slice(150, 151) ? (
                                  <NavLink
                                    to={`/course/${course._id}`}
                                    className={style.mas}
                                  >
                                    (...)
                                  </NavLink>
                                ) : null}
                              </span>
                            </div>
                          </div>

                          <div></div>
                        </div>
                      </div>
                    ))
                    .slice(0, 2)
                : null}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Home;
