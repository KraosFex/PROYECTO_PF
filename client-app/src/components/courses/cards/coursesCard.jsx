// libraries
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// Redux actions
import { bookmarkCourse, unmarkfavorites } from "../../../../redux/actions";

// styles
import { ThemeProvider } from "styled-components";
import CompletedIcon from "../../../icons/completedicon";
import JSIcon from "../../../icons/javascript";
import darkTheme from "./coursesCardDark.module.css";
import lightTheme from "./coursesCardLight.module.css";

let style = darkTheme;

export default function CoursesCard({ courses, setRefresh, refresh }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((store) => store.theme);
  let isLogged = useSelector((store) => store.isLogged);

  const { user } = useSelector((store) => store);

  const handleClick = (id) => {
    if (isFavorite) {
      dispatch(unmarkfavorites(id));
    } else {
      dispatch(bookmarkCourse(id));
    }
    refresh ? setRefresh(false) : setRefresh(true);
  };

  //FUNCION PARA SABER SI EL CURSO ES UNO FAVORITO O NO
  const isFavorite = (id) => {
    for (const course of user.courses) {
      if (course.course._id === id && course.isFavorite === true) {
        return true;
      }
    }
    return false;
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
                to={`/course/${course.titulo}`}
                className={style.courseName}
              >
                {course.titulo}
              </NavLink>
              <div className={style.courseStats}>
                {user.name ? isFavorite(course._id) ? (
                  <AiFillHeart onClick={() => handleClick(course._id, true)} />
                ) : (
                  <AiOutlineHeart
                    onClick={() => handleClick(course._id, false)}
                  />
                ):<AiOutlineHeart />}
                <span>Rating: {course.calificacion}</span>
              </div>
              <div className={style.descripcion}>
                <span>Descripcion: {course.descripcion}</span>
              </div>
            </div>
            <div className={style.lenguaje}>
              <JSIcon lenguajes={course.lenguaje} />
            </div>
            <div></div>
          </div>
        </ThemeProvider>
      ))}
    </div>
  );
}