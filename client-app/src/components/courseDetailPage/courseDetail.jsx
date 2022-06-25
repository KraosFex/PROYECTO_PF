// libraries
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findCourse } from "../../../redux/actions";
import { useParams } from "react-router-dom";

// hardDate
import { CursoBase } from "./CurssoBase";
import Stars from "./Vote/Vote";

// styles
import { ThemeProvider } from "styled-components";
import darkTheme from "./course/courseDark.module.css";
import lightTheme from "./course/courseLight.module.css";
import LessonSumary from "./course/lessonSumary/lessonSumary";
import { setArrowCourse } from "../../../redux/actions";
import ArrowsCourse from "../../icons/arrowsCourse";

export default function CourseDetail(props) {
  let { id } = useParams();

  let dispatch = useDispatch();

  const [idClase, setIdClase] = useState(1);
  const [claseSumary, setClaseSumary] = useState({});

  const [Course, setCourse] = useState("");

  useEffect(() => {
    const axionReq = async () => {
      const data = await dispatch(findCourse(id));
      console.log(data);
      setCourse(data);
    };
    axionReq();
  }, [dispatch]);

  console.log("hola", Course);
  let Curso = Course;
  if (Curso.lessons) {
    const lesson = Curso.lessons.find((o) => o._id === idClase);
    setClaseSumary(lesson);
  }
  let style = darkTheme;

  const direction = useSelector((store) => store.arrowCourse);

  const [activeArrow, setActiveArrow] = useState(false);

  const arrowDir = () => {
    if (direction === "down") dispatch(setArrowCourse("up"));
    if (direction === "up") dispatch(setArrowCourse("down"));
    setActiveArrow(!activeArrow);
  };

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
              <Stars />
            </div>
            <img className={style.imagen} alt="" src={Curso.imagen} />
          </div>
          <div className={style.flexContainer3}>
            <div className={style.containerDescrip}>
              <h3>Descripcion</h3>
              <p
                className={
                  activeArrow ? style.descriptionActive : style.description
                }
              >
                {Curso.description}
              </p>
              <div className={style.arrow} onClick={arrowDir}>
                <ArrowsCourse />
              </div>
              {/* <h3>Comentarios</h3> */}
            </div>
            <div className={style.flexContainer4}>
              <div className={style.flexContainer5}>
                <h3>Clases</h3>
                <div className={style.progreso}>
                  <div className={style.input}>
                    {Curso.clases &&
                      Curso.clases.map((e) => (
                        <div className={style.ClasP}>
                          {e.isCompleted ? (
                            <input
                              key={e.id}
                              defaultChecked
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
                              defaultChecked={false}
                              onClick={() => setIdClase(e.id)}
                              className={style.locked}
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </div>
                <div className={style.info}>
                  <div className={style.input2}>
                    <input defaultChecked type="radio" id="completada" />
                  </div>
                  <p>Completada</p>

                  <div className={style.input2}>
                    <input type="radio" id="disponible" />
                  </div>
                  <p>Disponible</p>

                  <div className={style.input2}>
                    <input type="radio" disabled />
                  </div>
                  <p>Bloqueada</p>
                </div>
              </div>
              <div className={style.lessonSumary}>
                <LessonSumary clase={Curso.lessons} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
