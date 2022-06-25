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
import darkTheme from "./courseDark.module.css";
import lightTheme from "./courseLight.module.css";
import LessonSumary from "./lessonSumary/lessonSumary";
import { setArrowCourse } from "../../../redux/actions";
import ArrowsCourse from "../../icons/arrowsCourse";

export default function CourseDetail(props) {
  let { id } = useParams();

  let dispatch = useDispatch();

  const [idClase, setIdClase] = useState("");
  const [activeArrow, setActiveArrow] = useState(false);
  const [course, setCourse] = useState({});
  const [claseSumary, setClaseSumary] = useState({});

  useEffect(() => {
    async function axionReq() {
      const data = await dispatch(findCourse(id));
      setCourse(data);
    }
    axionReq();
  }, [dispatch]);

  if (course.lesson) {
    const lesson = course.lessons.find((o) => o._id === idClase);
    setClaseSumary(lesson);
  }

  let Curso = course;
  let style = darkTheme;

  const direction = useSelector((store) => store.arrowCourse);

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
                    {Curso.lessons &&
                      Curso.lessons.map((e) => (
                        <div className={style.ClasP}>
                          {e.isCompleted ? (
                            <input
                              key={e._id}
                              defaultChecked
                              type="radio"
                              readOnly
                              onClick={() => setIdClase(e._id)}
                            />
                          ) : e.isLocked ? (
                            <input
                              key={e.id}
                              type="radio"
                              disabled
                              onClick={() => setIdClase(e._id)}
                            />
                          ) : (
                            <input
                              key={e._id}
                              type="radio"
                              defaultChecked={false}
                              onClick={() => setIdClase(e._id)}
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
                <LessonSumary clase={claseSumary} courseId={courseId}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
