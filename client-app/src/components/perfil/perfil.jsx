// import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useSelector } from 'react-redux'

// import shildren components
import YourCourse from './yourCourse/yourCourse'

// import stiles
import style from './perfil.module.css'

const Perfil = () => {

  const persona = useSelector(state => state.user)


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
        <div className={style.containerPerfil}>
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

      {/* YOUR_COURSE   */}
        <YourCourse className={style.YourCourse} coursesAll={coursesAll} />

    </div>
  )
}

export default Perfil;
