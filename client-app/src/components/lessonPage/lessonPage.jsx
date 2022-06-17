import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getLesson } from '../../../redux/actions';
import style from './lessonPage.module.css';

function LessonPage() {

const dispatch = useDispatch();

const { idCourse, idLesson} = useParams();

const [lesson, setLesson] = useState({});

useEffect(() => {

  const axiosData = async () => {
      try {
        const lessonData = await dispatch(getLesson(idCourse, idLesson));
        setLesson(lesson);
      } catch(err) {
        alert("algo paso pa");
      }
  }

axiosData();
}, [dispatch]);

  return (
    <div className={style.highContainer}>
      {/*ESTA ES TODA LA DATA QUE TRAE EL COMPONENETE DE MOMENTO*/}
      <div className={style.infoContainer}>
        <h1 className={style.title}>{lesson.title}</h1>
        <h4 className={style.description}>{lesson.descripcion}</h4>
      </div>
      {/*ACA IRIA EL COMPONENTE QUE TIENE QUE CREAR JOHAN CON EL EDITOR DE CODIGO Y EL TEST O GRAFICO*/}
    </div>
  )
}


export default LessonPage
