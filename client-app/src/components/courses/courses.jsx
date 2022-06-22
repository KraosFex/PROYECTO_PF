// libraries
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseByName, setShowedCourses } from "../../../redux/actions/index";

// utils
import { filter } from "../../utils/filters";
import { sortByRating } from "../../utils/sorter";

// styles
import { ThemeProvider } from "styled-components";
import CoursesCard from "./cards/coursesCard";
import darkTheme from "./courseDark.module.css";
import lightTheme from "./courseLight.module.css";

function Courses() {
  
  let style = darkTheme;
  
  const dispatch = useDispatch();
  
  const allCourses = useSelector((store) => store.courses);
  const tema = useSelector((store) => store.theme);
  const showedCourses = useSelector((store) => store.showedCourses);

  //forcing the re-render of the component
  const [refresh, setRefresh] = useState(true);


  const sorted = (event) => {
    const sortedArray = sortByRating(event, showedCourses, allCourses);
    dispatch(setShowedCourses(sortedArray));
    refresh ? setRefresh(false) : setRefresh(true);
  };

  const filtered = () => {
    const filterArray = filter(allCourses, showedCourses);
    dispatch(setShowedCourses(filterArray));
  };

  const search = (e) => {
    // SETEA TODOS LOS FILTROS/SORTS A false
    const selector = [...document.getElementsByName("votes")];
    selector[0].value = 0;
    const radioInputs = [...document.getElementsByName("progreso")];
    for (const input of radioInputs) {
      if (input.value === "Todos") {
        input.checked = true;
      } else {
        input.checked = false;
      }
    }
    const inputsCheckbox = [...document.getElementsByName("languages")];
    for (const input of inputsCheckbox) {
      input.checked = false;
    }

    dispatch(getCourseByName(e.target.value));
  };

  return (
    <ThemeProvider
      theme={tema === "light" ? (style = lightTheme) : (style = darkTheme)}
    >
      <div className={style.heightContainer}>
        <div className={style.flexContainer}>
          <div className={style.containerSearch}>
            <form onChange={(e) => search(e)} className={style.form}>
              <input
                type="search"
                placeholder="Buscar curso"
                className={style.input}
              />
            </form>
            <p className={style.p}>Ordenar por</p>
            <select
              className={style.select}
              name="votes"
              onChange={(e) => sorted(e)}
            >
              <option value="0">---</option>
              <option value="1">Mas votados</option>
              <option value="2">Menos votados</option>
            </select>
            <p className={style.p}>Lenguaje</p>
            <div className={style.select2} onChange={() => filtered()}>
              <label>JavaScript</label>
              <input
                type="checkbox"
                value="javascript"
                name="languages"
              ></input>
              <label>CSS</label>
              <input type="checkbox" value="css" name="languages"></input>
              <label>HTML</label>
              <input type="checkbox" value="html" name="languages"></input>
            </div>
            <p className={style.p}>Progreso</p>
            <div className={style.select2} onChange={() => filtered()}>
              <label>Todos</label>
              <input
                type="radio"
                value="Todos"
                name="progreso"
                defaultChecked
              ></input>
              <label>En Progreso</label>
              <input type="radio" value="En progreso" name="progreso"></input>
            </div>
          </div>
          <div className={style.flexContainer2}>
            <div className={style.container2}>
              <CoursesCard courses={showedCourses} />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Courses;
