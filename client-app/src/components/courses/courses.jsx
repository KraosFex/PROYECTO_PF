// libraries
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseByName } from "../../../redux/actions/index";

import { setArrowUpDown } from "../../../redux/reducer/index";
import { getCourses } from "../../../redux/actions/index";
// utils
import { filter } from "../../utils/filters";
import { sortByRating } from "../../utils/sorter";
import { ordered } from "../../utils/filterSorter";
import { lenguaje } from "../../utils/filterSorter";

// styles
import { ThemeProvider } from "styled-components";
import CoursesCard from "./cards/coursesCard";
import darkTheme from "./courseDark.module.css";
import lightTheme from "./courseLight.module.css";

//Icons
import ArrowsUpDown from "../../icons/arrowsUpDown";

function Courses() {
  let style = darkTheme;

  const dispatch = useDispatch();
  const allCourses = useSelector((state) => state.reducerCompleto.courses);
  const tema = useSelector((state) => state.reducerCompleto.theme);
  const courseSearch = useSelector(
    (state) => state.reducerCompleto.showedCourses
  );
  var showedCourses = courseSearch;
  const direction = useSelector((state) => state.reducerCompleto.arrowUpDown);

  //forcing the re-render of the component
  const [refresh, setRefresh] = useState(true);
  const [activeArrow, setActiveArrow] = useState(false);
  const [searchError, setSerachError] = useState({});

  // AGREGADO  PRUEBA--------------------------------
  const [order, setCourseOrder] = useState("");
  const [tipo1, setTipo1] = useState("0");
  const [tipo2, setTipo2] = useState("0");
  const [tipo3, setTipo3] = useState("0");

  const orderBy = (e) => {
    setCourseOrder(e.target.value);
  };
  const byTipo = (e) => {
    if (e.target.checked === true) {
      if (tipo1 === "0") setTipo1(e.target.value.toLowerCase());
      else if (tipo2 === "0") setTipo2(e.target.value.toLowerCase());
      else setTipo3(e.target.value.toLowerCase());
    } else if (e.target.checked === false) {
      if (e.target.value === tipo1) setTipo1("0");
      if (e.target.value === tipo2) setTipo2("0");
      if (e.target.value === tipo3) setTipo3("0");
    }
  };

  const search = async (e) => {
    // SETEA TODOS LOS FILTROS/SORTS A false
    e.preventDefault();
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
    if (e.target.value != "") {
      const dis = await dispatch(getCourseByName(e.target.value));
      const data = dis.payload;
      console.log(data);
      showedCourses = courseSearch;
      if (!data.success) {
        setSerachError({ err: data.info });
      } else {
        setSerachError({});
        showedCourses = courseSearch;
      }
    } else {
      dispatch(getCourses());
      showedCourses = courseSearch;
    }
  };

  if (
    (tipo1 && tipo1 != "0") ||
    (tipo2 && tipo2 != "0") ||
    (tipo3 && tipo3 != "0")
  )
    showedCourses = lenguaje(tipo1, tipo2, tipo3, showedCourses);
  if (order) showedCourses = ordered(order, showedCourses);

  //---------------------------------------------------

  const arrowDir = () => {
    if (direction === "down") dispatch(setArrowUpDown("up"));
    if (direction === "up") dispatch(setArrowUpDown("down"));
    setActiveArrow(!activeArrow);
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
              {searchError.err && (
                <label className={style.errSearch}>{searchError.err}</label>
              )}
            </form>
            <p className={activeArrow ? style.pActive : style.p}>Ordenar por</p>
            <select
              className={activeArrow ? style.selectActive : style.select}
              name="votes"
              onChange={(e) => orderBy(e)}
            >
              <option value="0">---</option>
              <option value="MasVotados">Mas votados</option>
              <option value="MenosVotados">Menos votados</option>
            </select>
            <p className={activeArrow ? style.pActive : style.p}>Lenguaje</p>
            <div
              className={activeArrow ? style.select2Active : style.select2}
              onChange={(e) => byTipo(e)}
            >
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
            <p className={activeArrow ? style.pActive : style.p}>Progreso</p>
            <div
              className={activeArrow ? style.select2Active : style.select2}
              onChange={() => filtered()}
            >
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
            <div className={style.icon} onClick={arrowDir}>
              <ArrowsUpDown />
            </div>
          </div>
          <div className={style.flexContainer2}>
            {searchError.err ? (
              <h1>NOT FOUND</h1>
            ) : (
              <div className={style.container2}>
                <CoursesCard
                  courses={showedCourses}
                  setRefresh={setRefresh}
                  refresh={refresh}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Courses;
