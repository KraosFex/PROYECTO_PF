import { useEffect, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Vimeo from '@u-wave/react-vimeo';

// redux actions
import { getLesson } from "../../../redux/actions";

// Components
import QuiztCart from "./quiztCart";

// style
import style from "./lessonPage.module.css";

// aqui me traigao la lesson

export default function LessonPage() {

  const [isReady, setIsReady] = useState(false)

  const [approved, setApproved] = useState(false);

  const [lesson, setLesson] = useState({});

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { idCourse, idLesson } = useParams()


  useEffect(() =>{
    async function axiosReq() {
      const data = await dispatch(getLesson(idLesson))
      setLesson(data.lesson)
    }

    axiosReq();
  },[dispatch])


  const handleApproved = (approved) => {
    setApproved(approved);
  };

  const handelSubmit = () => {
    /*
     * aqui deberia ir la ruta que actuliza la lesson del user
     */

    navigate(`/lesson/${courseId}/${IdOflesson + 1}`);
  };


  return (
    <div className={style.highContainer}>
      <div className={style.infoContainer}>
        <h1>{lesson.titulo}</h1>
        <h4 className={style.description}>{lesson.descripcion}</h4>
        <NavLink to={'/home'}> Volver al home </NavLink>
        <div className={style.video}>
          {lesson.video && <Vimeo video={`${lesson.video}`} responsive />}
        </div>
        {isReady?
        <QuiztCart questions={lesson.quiz} handleApproved={handleApproved} approved={approved} idCourse={idCourse} />
          :
        <button className={style.isReady} onClick={setIsReady(true)}>Comenzar Test</button>
        }
        <button disabled={approved} onClick={handelSubmit}>
          {" "}
          Siguiente leccion
        </button>
      </div>
    </div>
  );
}
