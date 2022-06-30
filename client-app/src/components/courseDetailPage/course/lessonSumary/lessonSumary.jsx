import React from "react";
import style from "./lessonSumary.module.css";
import { NavLink } from "react-router-dom";

function LessonSumary({ clase, num ,idCurse, state }) {
  clase = clase.lessons.find(e=> e.lesson.num===num)
  if (!clase) {return null}
  clase= clase.lesson
  return (
    <div className={style.flexContainer}>
      <div className={style.container}>
        <div className={style.flexContainer2}>
          {clase.titulo ? <h3>
            Clase: {clase.titulo}
          </h3> : null}
          <div className={style.disponible}>
            <p>{state}</p>
            <NavLink to={`/course/${idCurse}/${num}`}> Ver clase </NavLink>
          </div>
        </div>
        <h1>{clase.descripcion}</h1>
      </div>
    </div>
  );
}

export default LessonSumary;
