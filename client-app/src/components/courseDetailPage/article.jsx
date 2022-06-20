// libraries
import { useState } from "react";

// hardDate
import { CursoBase } from "./CurssoBase";

// styles
import { ThemeProvider } from "styled-components";
import darkTheme from "./course/courseDark.module.css";
import lightTheme from "./course/courseLight.module.css";
import LessonSumary from "./course/lessonSumary/lessonSumary";

export default function CardD(props) {
  
  let [idClase, setIdClase] = useState(1);
  let Curso = CursoBase;
  let claseSumary = Curso.clases.find((o) => o.id === idClase);
  const style = darkTheme;
  return (
    <ThemeProvider
      theme={
        props.theme === "light" ? (style = lightTheme) : (style = darkTheme)
      }
    >
      <div className={style.flexContainer}>
        <div className={style.Container}>
          <div className={style.flexContainer2}>
            <h1 className={style.titulo}>{Curso.titulo}</h1>
            <div className={style.data}>
              <label className={style.label}>
                Clasificacion: {Curso.calificacion}
              </label>
              <label className={style.label}>
                Usuarios Inscriptos: {Curso.userIncript}
              </label>
            </div>
            <img className={style.imagen} alt="" src={Curso.imagen} />
          </div>
          <div className={style.flexContainer3}>
            <div className={style.containerDescrip}>
              <h3>Descripcion</h3>
              <p>{Curso.description}</p>
              <h3>Comentarios</h3>
            </div>
            <div className={style.flexContainer4}>
              <div className={style.flexContainer5}>
                <p>
                  {" "}
                  --------------------------Barra de progreso
                  aca--------------------------
                </p>
                <div className={style.progreso}>
                  <div className={style.input}>
                    {Curso.clases.map((e) => (
                      <div className={style.ClasP}>
                        {e.isCompleted ? (
                          <input
                            key={e.id}
                            checked
                            type="radio"
                            readOnly
                            onClick={() => setIdClase(e.id)}
                          />
                        ) : e.isLocked ? (
                          <input
                            key={e.id}
                            type="radio"
                            disabled
                            onClick={() => setIdClase(e.id)}
                          />
                        ) : (
                          <input
                            key={e.id}
                            type="radio"
                            checked={false}
                            onClick={() => setIdClase(e.id)}
                            className={style.locked}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={style.info}>
                  <div className={style.input}>
                    <input checked type="radio" id="completada" />
                  </div>
                  <p>Completada</p>

                  <div className={style.input}>
                    <input type="radio" id="disponible" />
                  </div>
                  <p>Disponible</p>

                  <div className={style.input}>
                    <input type="radio" disabled />
                  </div>
                  <p>Bloqueada</p>
                </div>
              </div>
              <div className={style.lessonSumary}>
                <LessonSumary clase={claseSumary} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
