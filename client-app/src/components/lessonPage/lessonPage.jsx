import { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// redux actions
import { getLesson } from "../../../redux/actions/index";

// Components
import QuiztCart from "./quiztCart";

// style
import lightTheme from "./lessonPageLight.module.css";
import darkTheme from "./lessonPageDark.module.css";
import { ThemeProvider } from "styled-components";
import YouTube from "react-youtube";

// aqui me traigao la lesson

export default function LessonPage(props) {
  const [approved, setApproved] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { idCourse, idLesson } = useParams();
  const [lesson, setLesson] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  var style = lightTheme;
  const token = useSelector((state) => state.reducerCompleto.authToken);
  const refresh = useSelector((state) => state.reducerCompleto.refresh);
  useEffect(() => {
    async function axiosReq() {
      const data = await dispatch(getLesson({ id: idLesson, token }));
      setLesson(data.payload.lesson);
    }
    axiosReq();
  }, [dispatch]);

  const handleStart = () => {
    setIsReady(true);
  };

  const goBottom = () => {
    window.scrollTo({
      top: document.body.offsetHeight,
      behavior: "smooth",
    });
  };

  console.log(refresh);
  const startClick = (e) => {
    handleStart();
    setTimeout(() => goBottom(), 50);
  };

  const handleApproved = (approved) => {
    setApproved(approved);
  };
  const handleNextLesson = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const body = { idCourse, idLesson };
    try {
      const metaData = await axios.put(
        "/api/cursosprivate/iscompleted",
        body,
        config
      );
      dispatch(updateUser(metaData.data.updateUser));
      //navigate(`/course/${idCourse}/${metaData.data.nextLessonId}`)
    } catch (err) {
      alert("lesson no se pudo completar correctamente. lessonPage.jsx");
    }
  };
  console.log();
  return (
    <ThemeProvider
      theme={
        props.theme === "light" ? (style = lightTheme) : (style = darkTheme)
      }
    >
      <div className={style.highContainer}>
        <div className={style.infoContainer}>
          <h1>{lesson.titulo}</h1>
          <h4 className={style.description}>{lesson.descripcion}</h4>
          <div className={style.video}>
            {lesson.video && <YouTube videoId={`${lesson.video}`} />}
          </div>
          <div className={style.flexContainerDescrip}>
            {isReady ? (
              <QuiztCart
                questions={lesson.quiz}
                handleApproved={handleApproved}
                approved={approved}
                idCourse={idCourse}
                theme={props.theme}
                key={refresh}
              />
            ) : (
              <button className={style.isReady} onClick={startClick}>
                Comenzar Test
              </button>
            )}
            {approved ? (
              <button onClick={handleNextLesson}>Siguiente leccion</button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
