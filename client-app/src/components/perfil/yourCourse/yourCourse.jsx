import lightTheme from "./yourCourseLight.module.css";
import darkTheme from "./yourCourseDark.module.css";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";

const YourCourse = ({ coursesAll }) => {
  const theme = useSelector((store) => store.theme);
  console.log(theme);
  var style = theme;
  return (
    <ThemeProvider
      theme={theme === "light" ? (style = lightTheme) : (style = darkTheme)}
    >
      <div className={style.container}>
        <div className={style.listDetail}>
          <button className={style.button} onClick={() => handleClick()}>
            {" "}
            Cursos{" "}
          </button>
          <button className={style.button} onClick={() => handleClick()}>
            {" "}
            Favoritos{" "}
          </button>
          <button className={style.button}> Completados </button>
        </div>

        <div className={style.containerListYourCourse}>
          <div className={style.List}>
            <span className={style.cursos}>Nombre</span>
            <span className={style.cursos}>Favorito</span>
            <span className={style.cursos}>Clases totales</span>
            <span className={style.cursos}>Clases completas</span>
            <span className={style.cursos}>Lenguaje</span>
          </div>
          <div>{coursesAll}</div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default YourCourse;
