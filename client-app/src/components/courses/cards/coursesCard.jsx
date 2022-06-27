// libraries
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// Redux actions
import {
  bookmarkCourse,
  unmarkfavorites,
} from "../../../../redux/actions/index";

// styles
import { ThemeProvider } from "styled-components";
import CompletedIcon from "../../../icons/completedicon";
import JSIcon from "../../../icons/javascript";
import darkTheme from "./coursesCardDark.module.css";
import lightTheme from "./coursesCardLight.module.css";

let style = darkTheme;

function CoursesCard({ courses, setRefresh, refresh }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.reducerCompleto.theme);
  const isLogged = useSelector((state) => state.reducerCompleto.isLogged);
  const token = useSelector((state) => state.reducerCompleto.authToken);
  const { user } = useSelector((state) => state.reducerCompleto);

  const handleClick = (id, isFavorite) => {
    if (isFavorite) {
      dispatch(unmarkfavorites({ id, token }));
    } else {
      dispatch(bookmarkCourse({ id, token }));
    }
    refresh ? setRefresh(false) : setRefresh(true);
  };

  // FUNCION PARA SABER SI EL CURSO ES UNO FAVORITO O NO
  const isFavorite = (id) => {
    for (const course of user.courses) {
      if (course.course._id === id && course.isFavorite === true) {
        return (
          <AiFillHeart onClick={() => handleClick(course.course._id, true)} />
        );
      }
    }
    return <AiOutlineHeart onClick={() => handleClick(id, false)} />;
  };
  return (
    <div>
      {courses.map((course) => (
        <ThemeProvider
          key={course._id}
          theme={theme === "light" ? (style = lightTheme) : (style = darkTheme)}
        >
          <div className={style.containerCourse}>
            <div className={style.flexContainer}>
              <NavLink
                to={`/course/${course._id}`}
                className={style.courseName}
              >
                {course.titulo}
              </NavLink>
              <div className={style.courseStats}>
                {isLogged ? (
                  isFavorite(course._id)
                ) : (
                  <AiOutlineHeart onClick={() => navigate("/login")} />
                )}
                <span>Rating: {course.calificacion}</span>
              </div>
              <div className={style.descripcion}>
                <span>Descripcion: {course.descripcion}</span>
              </div>
            </div>
            <div className={style.lenguaje}>
              <JSIcon lenguajes={course.lenguaje.toLowerCase()} />
            </div>
          </div>
        </ThemeProvider>
      ))}
    </div>
  );
}

export default CoursesCard;
