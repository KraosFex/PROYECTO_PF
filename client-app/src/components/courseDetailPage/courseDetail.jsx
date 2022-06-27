// libraries
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findCourse } from "../../../redux/actions";
import { useParams } from "react-router-dom";

// hardDate
import RatingB from "./rating/rating";

// styles
import { ThemeProvider } from "styled-components";
import darkTheme from "./courseDark.module.css";
import lightTheme from "./courseLight.module.css";
import LessonSumary from "./lessonSumary/lessonSumary";
import { setArrowCourse } from "../../../redux/actions";
import ArrowsCourse from "../../icons/arrowsCourse";

export default function CourseDetail(props) {
  let { idCourse } = useParams();

  let dispatch = useDispatch();
  const [activeArrow, setActiveArrow] = useState(false);


 //forcing the re-render of the component
  const [refresh, setRefresh] = useState(false)

  const [course, setCourse] = useState({});
  const direction = useSelector((store) => store.arrowCourse);
  const user = useSelector((store) => store.user);
  const isLogged = useSelector((store) => store.isLogged);

  const [idClase, setIdClase] = useState("");
  let style = darkTheme;

  useEffect(() => {
    async function axionReq() {
      const data = await dispatch(findCourse(idCourse));
      setCourse(data);
    }
    axionReq();
  }, [dispatch]);


  if (isLogged && idClase) {
    let usercourse = user.courses.find((o) => o.course._id === idCourse);
    if(usercourse) {
      var lesson = usercourse.course.lessons.find((o) => o.lesson._id === idClase);
    } else {
      lesson = course.lessons.find((o) => o.lesson._id === idClase);
    }

  } else if (idClase) {
    lesson = course.lessons.find((o) => o.lesson._id === idClase);

  }

  const arrowDir = () => {
    if (direction === "down") dispatch(setArrowCourse("up"));
    if (direction === "up") dispatch(setArrowCourse("down"));
    setActiveArrow(!activeArrow);
  };


  const createCalification = () => {
    if(course.votes && course.votes.length){
      let calification = 0;
      for(const vote of course.votes) {
        calification += vote;
      }
      return Math.ceil(calification / course.votes.length);
    } else {
      return 0;
    }

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
                Clasificacion: {createCalification()}
              </label>
              <label className={style.label}>
                Usuarios Inscriptos: {course.userIncript}
              </label>
              <RatingB  idCourse={idCourse} setRefresh={setRefresh} refresh={refresh}/>
            </div>
            <img className={style.imagen} alt="" src={course.imagen} />
          </div>
          <div className={style.flexContainer3}>
            <div className={style.containerDescrip}>
              <h3>Descripcion</h3>
              <p
                className={
                  activeArrow ? style.descriptionActive : style.description
                }
              >
                {course.descripcion}
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
                    {course.lessons &&
                      course.lessons.map((e) => (
                        <div className={style.ClasP} key={e._id}>
                          {e.lesson.isCompleted ? (
                            <input
                              key={e._id}
                              defaultChecked={false}
                              type="radio"
                              readOnly
                              onClick={() => setIdClase(e.lesson._id)}
                            />
                          ) : e.lesson.isLocked ? (
                            <input
                              key={e.id}
                              type="radio"
                              disabled
                              onClick={() => setIdClase(e.lesson._id)}
                            />
                          ) : (
                            <input
                              key={e._id}
                              type="radio"
                              defaultChecked={false}
                              onClick={() => setIdClase(e.lesson._id)}
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
                <LessonSumary lessons={lesson} idCourse={idCourse} isLogged={isLogged}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
