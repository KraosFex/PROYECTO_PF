// libraries
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findCourse } from "../../../redux/actions/index";
import { useParams } from "react-router-dom";

// hardDate
import RatingB from "./rating/rating";
// styles
import { ThemeProvider } from "styled-components";
import darkTheme from "./courseDark.module.css";
import lightTheme from "./courseLight.module.css";
import LessonSumary from "./lessonSumary/lessonSumary";
import { setArrowCourse } from "../../../redux/reducer/index";
import ArrowsCourse from "../../icons/arrowsCourse";

export default function CourseDetail(props) {
  let { id } = useParams();
  let dispatch = useDispatch();

  const [refresh, setRefresh] = useState(false);
  const [activeArrow, setActiveArrow] = useState(false);
  const [course, setCourse] = useState({});
  const [userCourse, setUserCourse] = useState({});

  const direction = useSelector((state) => state.reducerCompleto.arrowCourse);
  const user = useSelector((state) => state.reducerCompleto.user);
  const isLogged = useSelector((state) => state.reducerCompleto.isLogged);

  const [idClase, setIdClase] = useState("");

  let style = darkTheme;


  useEffect(() => {
    async function axionReq() {
      const data = await dispatch(findCourse(id));
      setCourse(data.payload);
    }
    axionReq();
    if(isLogged) {
      let index = user.courses.find((o) => o.course._id === id);
      if(index) {
        setUserCourse(index)
      }
    }
  }, [dispatch]);

  var isLocked = true;

  if (user.isPremium) {
    isLocked = false;
  }


  if (isLogged && idClase) {
    let usercourse = user.courses.find((o) => o.course._id === id);
    if (usercourse) {
      var lesson = usercourse.course.lessons.find(
        (o) => o.lesson._id === idClase
      );
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
    if (course.votes && course.votes.length) {
      let calification = 0;
      for (const vote of course.votes) {
        calification += vote;
      }
      return (calification / course.votes.length).toFixed(1)
    } else {
      return 0;
    }
  };

console.log("soy yo, ", course)

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
                Usuarios Inscriptos: {course.userInscript}
              </label>
              <RatingB
                idCourse={id}
                setRefresh={setRefresh}
                refresh={refresh}
              />
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
                  {(isLogged && userCourse.course) &&
                    userCourse.lessons.map((e) => (
                      <div className={style.ClasP} key={e.lesson.toString()}>
                        {e.isCompleted ? (
                          <input
                            key={e.lesson}
                            defaultChecked={true}
                            type="radio"
                            readOnly
                            onClick={() => setIdClase(e.lesson)}
                          />
                        ) : e.isLocked ? (
                          <input
                            key={e.lesson}
                            type="radio"
                            disabled={isLocked}
                            onClick={() => setIdClase(e.lesson)}
                          />
                        ) : (
                          <input
                            key={e.lesson}
                            type="radio"
                            defaultChecked={false}
                            onClick={() => setIdClase(e.lesson)}
                            className={style.locked}
                          />
                        )}
                      </div>
                    ))}

                  {(!isLogged || !userCourse.course) && course.lessons &&
                    course.lessons.map((e) => (
                      <div className={style.ClasP} key={e._id}>
                        {e.lesson.isCompleted ? (
                          <input
                            key={e._id}
                            defaultChecked={true}
                            type="radio"
                            readOnly
                            onClick={() => setIdClase(e.lesson._id)}
                          />
                        ) : e.lesson.isLocked ? (
                          <input
                            key={e.id}
                            type="radio"
                            disabled={isLocked}
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
                <LessonSumary
                  lessons={lesson}
                  idCourse={id}
                  isLogged={isLogged}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
