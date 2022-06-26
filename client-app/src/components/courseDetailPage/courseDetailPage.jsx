// libraries
import { useState } from "react";
import { useSelector } from "react-redux";

// hardDate
import Stars from "./Vote/Vote";

// styles
import { ThemeProvider } from "styled-components";
import darkTheme from "./courseDark.module.css";
import lightTheme from "./courseLight.module.css";
import LessonSumary from "./lessonSumary/lessonSumary";

export default function CourseDetailPage(props) {
  const [idClase, setIdClase] = useState(0);
  let { detail, user } = useSelector(state => state)
  let Curso = detail;
  let claseSumary = user.courses ? user.courses.find((o) => o && o.course._id === detail._id) : [];
  let style = darkTheme;

  if (!detail.titulo) { return <div></div> }
  return (
    <ThemeProvider
      theme={
        props.theme === "light" ? (style = lightTheme) : (style = darkTheme)
      }
    >
      <div className={style.flexContainer}>
        <div className={style.Container}>
          <div className={style.flexContainer2}>
            <h1 className={style.titulo}>{Curso.titulo.toUpperCase()}</h1>
            <div className={style.data}>
              <label className={style.label}>
                Clasificacion: {Curso.votes.length > 0 ? (Curso.votes.reduce((a, b) => a + b, 0) / Curso.userVotes.length).toFixed(1) : 0}
              </label>
              <label className={style.label}>
                Usuarios Inscriptos: {Curso.userInscript}
              </label>
              <Stars idCurso={detail._id} idUser={user._id} calificacion={detail.calificacion} />
            </div>
            <img className={style.imagen} alt="" src={Curso.imagen} />
          </div>
          <div className={style.flexContainer3}>
            <div className={style.containerDescrip}>
              <h3>Descripcion</h3>
              <p>{Curso.descripcion}</p>
            </div>
            {!claseSumary ?null: claseSumary.course ? <div className={style.flexContainer4}>
              <div className={style.flexContainer5}>
                <div className={style.progreso}>
                  {claseSumary.course.lessons ? claseSumary.course.lessons.map((e,index) => (
                    <div className={style.ClasP} key ={index}>
                      {e.isComplete ? (
                        <>
                          <div className={style.input}>
                            <input readOnly checked type="radio" name="completada" key={e.id} onClick={() => setIdClase(index)} />
                          </div>
                          <p>Completada</p></>

                      ) : e.isLocked ? (
                        <>
                          <div className={style.input}>
                            <input disabled type="radio" name="complbloqueada" key={e.id} className={style.locked} onClick={() => setIdClase(index)} />
                          </div>
                          <p>Bloqueada</p></>
                      ) : (
                        <>
                          <div className={style.input}>
                            <input defaultChecked={false} type="radio" name="disponible" key={e.id} onClick={() => setIdClase(index)} />
                          </div>
                          <p>Disponible</p></>
                      )}
                    </div>
                  )).reverse() : null}

                </div>
              </div>
              {claseSumary.course.lessons ?<div className={style.lessonSumary}>
                <LessonSumary clase={Curso.lessons[idClase].lesson} idCurse={detail._id}  />
              </div>:null}
            </div> : null}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
