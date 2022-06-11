import { useSelector, useDispatch } from 'react-redux'

import { persona } from './personas'

import style from './perfil.module.css'

const Perfil = () => {
  const dispatch = useDispatch()

  // dispatch(getPersona())

  const courses = persona.courses.map(course => <div key={course.id}> 
                                                    <label> {course.name} </label>
                                                    <label> {course.tareas_Terminadas}  </label>
                                                </div>)

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
                <div>
                  <label> Name: </label>
                  <span> {persona.name} </span>
                </div>
                <div>
                  <label> e-mail: </label>
                  <span> {persona.email} </span>
                </div>
              </div>
            </div>
        </div>

        <div className={style.listDetail}>
            <a className={`${style.filtro} ${style.button}`} href="#">all</a>
            <a className={`${style.filtro} ${style.button}`} href="#x">cursos favoritos</a>
            <a className={`${style.filtro} ${style.button}`} href="#t">algo mas ...</a>
        </div>

        <div className={`${style.containerListYourCourse} ${style.container}`}>
            <div className={style.list}>
                {courses}
            </div>
        </div>
    </div>
  )
}

export default Perfil;
