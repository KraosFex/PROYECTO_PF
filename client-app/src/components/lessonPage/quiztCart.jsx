import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { setRefresh } from "../../../redux/reducer";
import { useSelector, useDispatch } from "react-redux";

// style
import style from "./questionsPage.module.css";

export default function QuiztCart({
  questions,
  handleApproved,
  approved,
  idCourse,
}) {
  if (questions) {
    const estandarTime = 10; //en segundos

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [puntuacion, setpuntuacion] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [tiempoRestante, setTiempoRestante] = useState(estandarTime);
    const [areDisabled, setAreDisabled] = useState(false);
    const [answersShown, setAnswersShown] = useState(false);

    function handleAnswerSubmit(isCorrect, e) {
      // añadir puntuacion
      if (isCorrect) {
        setpuntuacion(puntuacion + 1);
      }
      // añadir estilos de pregunta
      e.target.classList.add(isCorrect ? "correct" : "incorrect");
      // cambiar a la siguiente pregunta

      setTimeout(() => {
        if (preguntaActual === questions.length - 1) {
          setIsFinished(true);

          if ((100 * puntuacion) / (questions.length * 0.5) >= 80) {
            handleApproved(true);
          }
        } else {
          setPreguntaActual(preguntaActual + 1);
          setTiempoRestante(estandarTime);
        }
      }, 1500);
    }
    useEffect(() => {
      const intervalo = setInterval(() => {
        if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
        if (tiempoRestante === 0) setAreDisabled(true);
      }, 1000);

      return () => clearInterval(intervalo);
    }, [tiempoRestante]);

    if (isFinished)
      return (
        <main className={style.quiz}>
          <div className={style.juego_terminado}>
            <span>{approved ? "Aprobado" : "Vuelve a intentarlo"}</span>
            <span>
              {" "}
              Obtuviste {puntuacion} de {questions.length}{" "}
            </span>
            <button
              onClick={() => {
                setIsFinished(false);
                setAnswersShown(false);
                setPreguntaActual(0);
              }}
              className={style.button}
            >
              Volver a intentar
            </button>
          </div>
        </main>
      );

    if (answersShown)
      return (
        <main className={style.quiz}>
          <div className={`${style.lado_izquierdo}`}>
            <div className={`${style.pregunta_numero}`}>
              <span>
                {" "}
                Pregunta {preguntaActual + 1} de {questions.length}
              </span>
            </div>
            <div className={`${style.titulo_pregunta}`}>
              {questions[preguntaActual].titulo}
            </div>
            <div>
              {
                questions[preguntaActual].opciones.filter(
                  (opcion) => opcion.isCorrect
                )[0].textoRespuesta
              }
            </div>
            <button
              className={style.button}
              onClick={() => {
                if (preguntaActual === questions.length - 1) {
                  dispatch(setRefresh(Math.random()));
                } else {
                  setPreguntaActual(preguntaActual + 1);
                }
              }}
            >
              {preguntaActual === questions.length - 1
                ? "Volver a intentar"
                : "Siguiente"}
            </button>
          </div>
        </main>
      );

    return (
      <main className={style.quiz}>
        <div className={style.lado_izquierdo}>
          <div className={`${style.pregunta_numero}`}>
            <span>
              {" "}
              Pregunta {preguntaActual + 1} de {questions.length}
            </span>
          </div>
          <div className={`${style.titulo_pregunta}`}>
            {questions[preguntaActual].titulo}
          </div>
          <div>
            {!areDisabled ? (
              <span className={style.tiempo_restante}>
                Tiempo restante: {tiempoRestante}{" "}
              </span>
            ) : (
              <button
                className={style.button}
                onClick={() => {
                  setTiempoRestante(10);
                  setAreDisabled(false);
                  if (preguntaActual === questions.length - 1) {
                    setIsFinished(true);
                  } else {
                    setPreguntaActual(preguntaActual + 1);
                  }
                }}
              >
                Continuar
              </button>
            )}
          </div>
        </div>
        <div className={style.lado_derecho}>
          {questions[preguntaActual].opciones.map((respuesta) => (
            <button
              className={style.button}
              disabled={areDisabled}
              key={respuesta.textoRespuesta}
              onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
            >
              {respuesta.textoRespuesta}
            </button>
          ))}
        </div>
      </main>
    );
  } else {
    return (
      <>
        <h1>Preguntas no Encontradas</h1>
      </>
    );
  }
}
