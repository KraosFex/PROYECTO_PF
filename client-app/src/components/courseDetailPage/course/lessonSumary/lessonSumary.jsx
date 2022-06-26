import React from "react";
import style from "./lessonSumary.module.css";
import { NavLink } from "react-router-dom";

function LessonSumary({ clase, idCurse }) {
  var completo = clase.isComplete === true ? "Completada" : "Disponible";
  return (
    <div className={style.flexContainer}>
      <div className={style.container}>
        <div className={style.flexContainer2}>
          {clase.titulo ? <h3>
            Clase: {clase.titulo}
          </h3> : null}
          <div className={style.disponible}>
            <p>{completo}</p>
            <NavLink to={`/course/${idCurse}/${clase._id}`}> Ver clase </NavLink>
          </div>
        </div>
        <h1>{clase.descripcion}</h1>
      </div>
    </div>
  );
}

export default LessonSumary;
