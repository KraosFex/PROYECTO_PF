import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "./card/card";
<<<<<<< HEAD
import darkTheme from "./course/courseDark.module.css";
import lightTheme from "./course/courseLight.module.css";
import LessonSumary from "./course/lessonSumary/lessonSumary";
import { ThemeProvider } from "styled-components";

let clase = {
  title: "Clase",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.    Mollitia, deserunt rerum. Aspernatur, quos.",
  temas: ["Java", "script", "Front", "Back"],
  isCompleted: false,
};

let c = 3;
=======
import style from "./course/course.module.css"
import Stars from "./Vote/Vote";

let lessons = { titulo: "Clase", descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.    Mollitia, deserunt rerum. Aspernatur, quos." , isCompleted: false }

let c = 3

>>>>>>> 1be860b2a19cc436c0e18551cdb7b03808c791cf
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

<<<<<<< HEAD
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
=======
    let [index, setIndex] = useState([0, c])
    let id = useParams().id;
    const { CurseDetail, user } = useSelector((state) => state);

    let CursoBase = { id, titulo: "Curso " + id, calificacion: 2000, userVotes:{length: 500} , imagen: "http://www.venturapp.com/wp-content/uploads/2016/03/html_elementos_etiquetas_usadas-680x350.jpg", userIncript: 4567, description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.    Mollitia, deserunt rerum. Aspernatur, quos.    Quasi dolores earum, non minus ipsa iure sunt,    odio distinctio assumenda ullam sit ea perferendis quaerat facilis?Lorem ipsum dolor sit amet, consectetur adipisicing elit.    Mollitia, deserunt rerum. Aspernatur, quos.    Quasi dolores earum, non minus ipsa iure sunt,    odio distinctio assumenda ullam sit ea perferendis quaerat facilis", lessons: [{ ...lessons, num: 1, isCompleted: true }, { ...lessons, num: 2, isCompleted: true }, { ...lessons, num: 3, isCompleted: true }, { ...lessons, num: 4 }, { ...lessons, num: 5 }, { ...lessons, num: 6 }, { ...lessons, num: 7 }] }

    let Curso = CursoBase;
    let MaxClase = Curso.lessons.length
    let list = Curso.lessons.slice(index[0], index[1])
    let progress = user.courses? user.courses : CursoBase.lessons.map(e=>{return{course: e, isFavorite:false}})
    let complete = progress.filter(e=> e.course.isCompleted )
    return (
        <div className={style.Container}>
            <div className={style.sup}>
                <div className={style.data}>
                    <h1 className={style.titulo}>{Curso.titulo.toUpperCase()}</h1>
                    <label className={style.label}>Clasification: {(Curso.calificacion/Curso.userVotes.length).toFixed(1)}</label>
                    <label className={style.label}>Usuarios Inscriptos: {Curso.userIncript}</label>
                </div>
                <img className={style.imagen} alt="" src={Curso.imagen} />
            </div>
            <Stars idCurso={Curso.id} idUser={user? user.id: null}/>
            <p>{Curso.description}</p>
            <h4 className={style.h4}>Clases:</h4>
            <div className={style.clases}>
                {index[0] - 1 > 0 ? <button className={style.arrowi} onClick={() => Change("prev", index[0], setIndex)}><img className={style.ai} alt="" src="https://www.pngmart.com/files/3/Up-Arrow-PNG-HD.png" /></button> : null}
                {list.map((e) => <Card key={e.num} e={e} />)}
                {index[1] + 1 <= MaxClase ? <button className={style.arrowd} onClick={() => Change("next", index[1], setIndex)}><img className={style.ai} alt="" src="https://www.pngmart.com/files/3/Up-Arrow-PNG-HD.png" /></button> : null}
            </div>
            <h4 className={style.h4}>Progress:</h4>
            <div className={style.bar}>
                <label>{(complete.length/MaxClase*100).toFixed(1)}%</label>
                <input type="range" max={100}  min ={0} readOnly value={complete.length/MaxClase*100}/>
            </div>
            <div className={style.progreso}>
                {progress.map((e) => <div className={style.ClasP} key={e.course.num}>{e.course.isCompleted ? <input checked type="radio" readOnly/>: <input key={e.num} type="radio" disabled/>}{e.course.titulo}</div>)}
                {progress.map((e) => <div className={style.ClasP} key={e.course.num}>{e.course.isCompleted ? <input checked type="radio" readOnly/>: <input key={e.num} type="radio" disabled/>}{e.course.titulo}</div>)}
                {progress.map((e) => <div className={style.ClasP} key={e.course.num}>{e.course.isCompleted ? <input checked type="radio" readOnly/>: <input key={e.num} type="radio" disabled/>}{e.course.titulo}</div>)}
            </div>
            
>>>>>>> 1be860b2a19cc436c0e18551cdb7b03808c791cf
        </div>
      </div>
    </ThemeProvider>
  );
}
