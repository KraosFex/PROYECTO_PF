import Vimeo from '@u-wave/react-vimeo';
import { useParams, NavLink } from 'react-router-dom';

// style
import style from './lessonPage.module.css';

function LessonPage() {
  const { leccionId } = useParams()
  const leccion = parseInt(leccionId)
  return (
    <div className={style.highContainer}>
      {/*ESTA ES TODA LA DATA QUE TRAE EL COMPONENETE DE MOMENTO*/}
      <div className={style.infoContainer}>
        <NavLink to={'/home'}> Volver al home </NavLink>
        <div className={style.video}>
          <Vimeo video='76979871' autoplay responsive />
        </div>
        <h4 className={style.description}>Una description</h4>
        <button> <NavLink to={`/lesson/${leccion}/Testing`}> ir al test </NavLink> </button>
      </div>
      
    </div>
  )
}

export default LessonPage;
