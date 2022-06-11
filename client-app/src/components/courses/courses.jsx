import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { getCourseByName, setShowedCourses } from '../../../redux/actions/index'
import { lenguaje, ordered } from '../../utils/filters'
import CoursesCard from './cards/coursesCard'
import darkTheme from './courseDark.module.css'
import lightTheme from './courseLight.module.css'



function Courses () {
  const dispatch = useDispatch()
  const allCourses = useSelector((store) => store.courses);
  const tema = useSelector((store) => store.theme);
  const showedCourses = useSelector((store) => store.showedCourses);

  //forcing the re-render of the component
  const [refresh, setRefresh] = useState(true);

  let style = darkTheme;

const sortByRating = (e) => {
  let tempArr = showedCourses;

  if(e.target.value === "1"){
    tempArr.sort((a, b) => {
      return b.calificacion - a.calificacion;
    });
  } else if (e.target.value === "2") {
    tempArr.sort((a, b) => {
      return a.calificacion - b.calificacion;
    });
  } else {
    dispatch(setShowedCourses(allCourses));
  }

  dispatch(setShowedCourses(tempArr));

  refresh ? setRefresh(false) : setRefresh(true);
}

const filter = (e) => {
  console.log(e)
}

  return (
    <ThemeProvider
      theme={tema === 'light' ? (style = lightTheme) : (style = darkTheme)}
    >
      <div className={style.flexContainer}>
        <div className={style.containerSearch}>
          <form onChange={(e) => submit(e)} className={style.form}>
            <input
              type='search'
              placeholder='Buscar curso'
              className={style.input}
            />
            <button className={style.button} type='submit'>
              Search
            </button>
          </form>
          <p className={style.p}>Ordenar por</p>
          <select className={style.select} name='votes' onChange={(e) => sortByRating(e)}>
            <option value='0'>---</option>
            <option value='1'>Mas votados</option>
            <option value='2'>Menos votados</option>
          </select>
          <p className={style.p}>Lenguaje</p>
          <select className={style.select} name='languages' onChange={(e) => filter(e)}>
            <option value='0'>---</option>
            <option value='javascript'>JavaScript</option>
            <option value='css'>CSS</option>
            <option value='html'>HTML</option>
          </select>
          <p className={style.p}>Progreso</p>
          <select className={style.select} name='progreso' onChange={(e) => filter(e)}>
            <option value='1'>Todos</option>
            <option value='2'>Empezados</option>
          </select>
        </div>
        <div className={style.flexContainer2}>
          <div className={style.container2}>
            <CoursesCard courses={showedCourses} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Courses
