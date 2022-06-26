import { useState, useEffect } from "react";

// style
import style from "./questionsPage.module.css";

export default function QuiztCart({ questions, handleApproved, approved }) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuación, setPuntuación] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);

  const constApproved = questions.length * 0.5;

  function handleAnswerSubmit(isCorrect, e) {
    // añadir puntuación
    if (isCorrect) setPuntuación(puntuación + 1);
    // añadir estilos de pregunta
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
    // cambiar a la siguiente pregunta

    setTimeout(() => {
      if (preguntaActual === questions.length - 1) {
        setIsFinished(true);
        if (constApproved > (puntuación * 100) / questions.length)
          handleApproved(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
        setTiempoRestante(10);
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
        <div className={style.juegoterminado}>
          <span>{approved ? "is approved" : "not approved"}</span>
          <span>
            {" "}
            Obtuviste {puntuación} de {questions.length}{" "}
          </span>
          <button
            onClick={() => {
              setIsFinished(false);
              setAnswersShown(true);
              setPreguntaActual(0);
            }}
            className={style.button}
          >
            Ver respuestas
          </button>
        </div>
      </main>
    );

  if (answersShown)
    return (
      <main className={style.quiz}>
        <div className={style.lado - izquierdo}>
          <div className={style.numero - pregunta}>
            <span> Pregunta {preguntaActual + 1} de</span> {questions.length}
          </div>
          <div className={style.titulo - pregunta}>
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
                window.location.href = "/";
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
      <div className={style.lado - izquierdo}>
        <div className={style.numero - pregunta}>
          <span> Pregunta {preguntaActual + 1} de</span> {questions.length}
        </div>
        <div className={style.titulo - pregunta}>
          {questions[preguntaActual].titulo}
        </div>
        <div>
          {!areDisabled ? (
            <span className={style.tiempo - restante}>
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
      <div className={style.lado - derecho}>
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
}
