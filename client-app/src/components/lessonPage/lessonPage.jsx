import Vimeo from '@u-wave/react-vimeo';
import { useParams, NavLink } from 'react-router-dom';

// style
import style from './lessonPage.module.css';

function LessonPage() {
  const { leccionId } = useParams()
  // const leccion = curso.lecciones.find(leccion => leccion.id === parseInt(leccionId))
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
        <button> <NavLink to={'/home'}> ir al test </NavLink> </button>
      </div>
      {/*ACA IRIA EL COMPONENTE QUE TIENE QUE CREAR JOHAN CON EL EDITOR DE CODIGO Y EL TEST O GRAFICO*/}
    </div>
  )
}

export default LessonPage;
