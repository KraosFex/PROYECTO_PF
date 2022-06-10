import React, { useState } from "react";
import darkTheme from "./courseDark.module.css";
import lightTheme from "./courseLight.module.css";
import CoursesCard from "./cards/coursesCard";
import { getCourseByName } from "../../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { lenguaje, ordered } from "../Filters/filters";
import { ThemeProvider } from "styled-components";

var style = darkTheme;
function Courses() {
  const courses = useSelector((store) => store.courses);
  const tema = useSelector((store) => store.theme);
  var coursess = courses;
  const dispatch = useDispatch();
  const [courseSearch, setCourseSearch] = useState("");
  const [order, setCourseOrder] = useState("");
  const [lengua, setCourseLenguaje] = useState("");
  const handleInputChange = (e) => {
    setCourseSearch(e.target.value);
  };

  const orderBy = (e) => {
    setCourseOrder(e.target.value);
  };
  const byTipo = (e) => {
    setCourseLenguaje(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(getCourseByName(courseSearch));
    setCourseSearch("");
  };
  if (lengua && lengua != "0") coursess = lenguaje(lengua, courses);
  if (order) coursess = ordered(order, courses);

  return (
    <ThemeProvider
      theme={tema === "light" ? (style = lightTheme) : (style = darkTheme)}
    >
      <div className={style.flexContainer}>
        <div className={style.containerSearch}>
          <form onSubmit={submit}>
            <input
              type="search"
              value={courseSearch}
              placeholder="Buscar curso"
              onChange={handleInputChange}
            />
            <button type="submit">Search</button>
          </form>
          <p>Ordenar por</p>
          <select name="Ordernar" onChange={orderBy}>
            <option value="0">Seleccionar</option>
            <option value="MasVotados">Mas votados</option>
            <option value="MenosVotados">Menos votados</option>
          </select>
          <p>Lenguaje</p>
          <select name="Lenguaje" onChange={byTipo}>
            <option value="0">seleccionar</option>
            <option value="javascript">JavaScript</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
          </select>
          <p>Progreso</p>
          <select name="Progreso">
            <option value="0">Seleccionar</option>
            <option value="1">Todos</option>
            <option value="2">Empezado</option>
          </select>
        </div>
        <div className={style.flexContainer2}>
          <div className={style.container2}>
            <CoursesCard courses={coursess} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Courses;
