import { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Vimeo from "@u-wave/react-vimeo";

// redux actions
import { getLesson } from "../../../redux/actions/index";

// Components
import QuiztCart from "./quiztCart";

// style
import style from "./lessonPage.module.css";

// aqui me traigao la lesson

export default function LessonPage() {
  const [approved, setApproved] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { idCourse, idLesson } = useParams();
  const [lesson, setLesson] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        "http://localhost:3001/api/cursosprivate/iscompleted",
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
    <div className={style.highContainer}>
      <div className={style.infoContainer}>
        <h1>{lesson.titulo}</h1>
        <h4 className={style.description}>{lesson.descripcion}</h4>
        <div className={style.video}>
          {lesson.video && <Vimeo video={`${lesson.video}`} responsive />}
        </div>
        <div className={style.flexContainerDescrip}>
          {isReady ? (
            <QuiztCart
              questions={lesson.quiz}
              handleApproved={handleApproved}
              approved={approved}
              idCourse={idCourse}
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
  );
}
