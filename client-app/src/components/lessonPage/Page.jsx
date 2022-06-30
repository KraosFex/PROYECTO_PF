// libraries
import { useState } from "react";
import Vimeo from "@u-wave/react-vimeo";
import { useSelector } from "react-redux";
import QuiztCart from "./quiztCart";
import { NavLink } from "react-router-dom";
// redux actions 
import { Aprobar, AprobarCurso } from "../../../redux/actions";
// style
import style from './lessonPage.module.css';

export default function Page(props) {
  const [approved, setApproved] = useState(false);
  const [quiz, setquiz] = useState(props.quiz);

  const handleApproved = (apro) => {
    setApproved(apro);
  };
  const handleQuiz = (apro) => {
    setquiz(apro);
  };
  const { lesson, user, detail } = useSelector(state => state);

  if (!lesson.titulo) { return <></> }
  let next = lesson.num + 1

  function Revisar() {
    Aprobar(user._id, lesson._id, lesson.num, detail._id)(props.dispatch)
    props.setRefresh(true)
    setquiz(false)
    setApproved(false)
  }
  function Finalizar(){
    Revisar();
    AprobarCurso(user._id, detail._id)(props.dispatch);
  }
  return (
    <div className={style.infoContainer}>
      <div className={style.volver}><NavLink to={`/course/${detail._id}`}>Back to course</NavLink> <NavLink to={`/home`}>Go home</NavLink></div>
      <div className={style.form}>
        <div className={style.info}>
          <h1 className={style.title}>{lesson.titulo}</h1>
          <hr />
          <p className={style.description}>{lesson.descripcion}</p>
          <div className={style.video}>
            <Vimeo video={lesson.video} responsive className={style.video} />
          </div>
        </div>
        {quiz ? <QuiztCart
          questions={lesson.quiz}
          handleApproved={handleApproved}
          approved={approved}
        /> : <button className={style.send} onClick={() => handleQuiz(true)}> Hacer quiz</button>}
         {approved ?
          <label>
            *Recuerda que deber oprimir el boton para guardar tu progreso*
          </label> : null}
        {approved && !lesson.last ?
          <button  className={style.sendb} onClick={() => Revisar()}><NavLink  className={style.sendN} to={`/course/${detail._id}/${next}`}>
            Siguiente leccion
          </NavLink></button> : null}
        {approved && lesson.last  ?
          <button className={style.sendb}onClick={() => {Finalizar()}}><NavLink className={style.sendN} to={`/course/${detail._id}`}>
            Terminar el Curso
          </NavLink></button> : null}
      </div>
    </div>
  )
}

