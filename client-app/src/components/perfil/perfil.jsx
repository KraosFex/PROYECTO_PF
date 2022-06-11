// import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { persona } from './personas'

import style from './perfil.module.css'

const Perfil = () => {

  // dispatch(getPersona())

  const [courses, setCourse] = useState(persona.courses)


  const handleClick = ()  =>{ 
    return setCourse(
      courses = courses.filter(courseIsTrue => courseIsTrue.favorito === true)
    )
     
  }

  const coursesAll = courses.map(course => {
    return(
      <div className={style.cartYourCourse} key={course.id}> 
        <label> {course.name} </label>
        <label> {course.favorito === true ? 'FAVORITO' : 'NOT FAVORITO'}  </label>
        <label> {course.lecciones_Totales}  </label>
        <label> {course.lecciones_Termidas}  </label>
      </div>
      )
  })

  return(
    <div className={style.containerHeader}>
        <div className={`${style.containerPerfil} ${style.container}`}>
            <div className={style.perfilDates}>
              <div className={style.containerImg}>
                <img className={style.imgPerfil} src={persona.Imagen} alt="aqui va un imagen" />
              </div>
              <div className={style.userDetail}>
                <div className={style.Username}>
                  <label> User: </label>
                  <span>{persona.username}</span>
                </div>
                <div className={style.flex}>
                  <div className={style.item}>
                    <div>
                      <label> Name: </label>
                      <span> {persona.name} </span>
                    </div>
                    <div>
                      <label> e-mail: </label>
                      <span> {persona.email} </span>
                    </div>
                  </div>
                  <div className={style.item}>
                    <div>
                      <label> Member Since: </label>
                      <span> {persona.Member_Since} </span>
                    </div>
                    <div>
                      <label> Last Seen: </label>
                      <span> {persona.Last_Seen} </span>
                    </div>  
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div className={style.listDetail}>
            <button className={style.button} onClick={() => handleClick()}> show all </button>
            <button className={style.button} onClick={() => handleClick()}> show favoritos </button>
            <button className={style.button}> completed </button>
        </div>

        <div className={style.containerListYourCourse}>
            <div className={style.list}>
                {coursesAll}
            </div>
        </div>
    </div>
  )
}

export default Perfil;
