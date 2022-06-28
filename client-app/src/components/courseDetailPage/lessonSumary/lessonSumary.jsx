import React, { useEffect, useState } from "react";
import style from "./lessonSumary.module.css";
import { NavLink } from "react-router-dom";

function LessonSumary({ lessons, idCourse, isLogged }) {
  if (lessons) {
    var completo =
      lessons.lesson.isCompleted === true ? "Completada" : "Disponible";
    return (
      <div className={style.flexContainer}>
        <div className={style.container}>
          <div className={style.flexContainer2}>
            <h3 className={style.title}>{lessons.lesson.titulo}</h3>
            <div className={style.disponible}>
              <p>{completo}</p>
            </div>
          </div>
          <h1>{lessons.lesson.descripcion}</h1>
          <div className={style.flexContainer3}>
            {isLogged ? (
              <NavLink to={`/course/${idCourse}/${lessons.lesson._id}`}>
                {" "}
                Ver Clase{" "}
              </NavLink>
            ) : (
              <NavLink to="/login"> Inicia sesion primero </NavLink>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default LessonSumary;
