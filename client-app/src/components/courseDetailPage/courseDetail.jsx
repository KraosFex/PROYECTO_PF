// libraries
import { useState,  useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

//actions
import { findCourse } from '../../../redux/actions';

// hardDate
import Stars from "./Vote/Vote";

// styles
import { ThemeProvider } from "styled-components";
import darkTheme from "./courseDark.module.css";
import lightTheme from "./courseLight.module.css";
import LessonSumary from "./lessonSumary/lessonSumary";

export default function CourseDetail(props) {

  const { id } = useParams();

  const [ course, setCourse ] = useState({});

  const dispatch = useDispatch();


  const [idClase, setIdClase] = useState(1);
  const [claseSumary, setClaseSumary] = useState({});


  let style = darkTheme;

  useEffect(() => {
    async function axionReq() {
      const data = await dispatch(findCourse(id));
      setCourse(data)
    }

    axionReq();
  }, [dispatch])

  if(course.lesson) {
    const lesson = course.lessons.find((o) => o._id === idClase);
    setClaseSumary(lesson)
  }

  return (
    <ThemeProvider
      theme={
        props.theme === "light" ? (style = lightTheme) : (style = darkTheme)
      }
    >
      <div className={style.flexContainer}>
        <div className={style.Container}>
          <div className={style.flexContainer2}>
            <h1 className={style.titulo}>{course.titulo}</h1>
            <div className={style.data}>
              <label className={style.label}>
                Clasificacion: {course.calificacion}
              </label>
              <label className={style.label}>
                Usuarios Inscriptos: {course.userIncript}
              </label>
              <Stars />
            </div>
            <img className={style.imagen} alt="" src={course.imagen} />
          </div>
          <div className={style.flexContainer3}>
            <div className={style.containerDescrip}>
              <h3>Descripcion</h3>
              <p>{course.description}</p>
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
                    {course.lessons && course.lessons.map((e) => (
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
                  <div className={style.input}>
                    <input defaultChecked type="radio" id="completada" />
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
                <LessonSumary clase={claseSumary} courseId={courseId}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
