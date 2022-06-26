import React, { useEffect, useState } from "react";
import style from "./lessonSumary.module.css";
import { NavLink } from "react-router-dom";

function LessonSumary({ clase }) {
  if (clase) {
    var completo = clase.isCompleted === true ? "Completada" : "Disponible";
    return (
      <div className={style.flexContainer}>
        <div className={style.container}>
          <div className={style.flexContainer2}>
            <h3>
              Clase {clase._id}: {clase.titulo}
            </h3>
            <div className={style.disponible}>
              <p>{completo}</p>
            </div>
          </div>
          <h1>{clase.descripcion}</h1>
          <div className={style.flexContainer3}>
            <NavLink to={"#"}> Ver clase </NavLink>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default LessonSumary;
