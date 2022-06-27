import { useEffect, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Vimeo from '@u-wave/react-vimeo';
import axios from 'axios';

// redux actions
import { getLesson, updateUser } from "../../../redux/actions";

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

  const handleStart = () => {
    setIsReady(true)
  }

  const handleNextLesson = async () => {

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      }
    }
    const body = {idCourse, idLesson}
    try {
      const metaData = await axios.put("http://localhost:3001/api/cursosprivate/iscompleted", body, config)
      dispatch(updateUser(metaData.data.updateUser))
      //navigate(`/course/${idCourse}/${metaData.data.nextLessonId}`)
    } catch(err){
      alert("lesson no se pudo completar correctamente. lessonPage.jsx")
      console.log(err)
    }

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
          <button className={style.isReady} onClick={handleStart}>Comenzar Test</button>
        }
        {approved?
          <button onClick={handleNextLesson}>Siguiente leccion</button>
          :
          <></>
        }
      </div>
    </div>
  );
}
