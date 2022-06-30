// libraries
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// redux actions 
import { getLesson, findCourse } from '../../../redux/actions';
import Page from './Page';
// style
import style from './lessonPage.module.css';
import { useState } from 'react';


function LessonPage() {
  let { idLesson } = useParams();
  const dispatch = useDispatch();
  getLesson(idLesson)(dispatch);
  let [refresh, setRefresh] =useState(false)
  return (
    <div className={style.highContainer}>
      <Page dispatch={dispatch} findCourse={findCourse} setRefresh={setRefresh} quiz={false}/>
    </div>
  )
}


export default LessonPage
