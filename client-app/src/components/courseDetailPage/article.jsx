import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "./card/card";
import darkTheme from "./course/courseDark.module.css";
import lightTheme from "./course/courseLight.module.css";
import LessonSumary from "./course/lessonSumary/lessonSumary";
import { ThemeProvider } from "styled-components";
import Stars from "./Vote/Vote";

let clase = {
  title: "Clase",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.    Mollitia, deserunt rerum. Aspernatur, quos.",
  temas: ["Java", "script", "Front", "Back"],
  isCompleted: false,
};

let c = 3;

function Change(clase, index, set) {
  if (clase === "next") {
    set([index, index + c]);
  }
  if (clase === "prev") {
    set([index - c, index]);
  }
}

export default function CardD(props) {
  let [index, setIndex] = useState([0, c]);
  let [idClase, setIdClase] = useState(1);
  let id = useParams().id;
  const { CurseDetail } = useSelector((state) => state);
  let CursoBase = {
    id,
    titulo: "JavaScript",
    calificacion: 2000,
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png",
    userIncript: 4567,
    description:
      "JavaScript es el lenguaje de programación que debes usar para añadir características interactivas a tu sitio web, (por ejemplo, juegos, eventos que ocurren cuando los botones son presionados o los datos son introducidos en los formularios, efectos de estilo dinámicos, animación, y mucho más)",
    clases: [
      {
        ...clase,
        id: 1,
        titulo: "Hello World!",
        descripcion: "El tipico ejercicio introductorio Hello World",
        isCompleted: true,
        isLocked: false,
      },
      {
        ...clase,
        id: 2,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: true,
        isLocked: false,
      },
      {
        ...clase,
        id: 3,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        descripcion: "clase de prueba?",
        isCompleted: true,
        isLocked: false,
      },
      {
        ...clase,
        id: 4,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: false,
      },
      {
        ...clase,
        id: 5,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 6,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 7,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 8,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 9,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 10,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 11,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 12,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 13,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 14,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 15,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 16,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 17,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 18,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 19,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 20,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 21,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 22,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 23,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 24,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 25,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 26,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
      {
        ...clase,
        id: 27,
        titulo: "clase prueba",
        descripcion: "clase de prueba",
        isCompleted: false,
        isLocked: true,
      },
    ],
  };
  
  let Curso = CursoBase;
  let claseSumary = Curso.clases.find((o) => o.id === idClase);
  let MaxClase = Curso.clases.length;
  let list = Curso.clases.slice(index[0], index[1]);
  console.log(claseSumary);
  var style = darkTheme;
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
