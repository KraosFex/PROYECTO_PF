// style
import style from './lessonPage.module.css';

function LessonPage() {

  return (
    <div className={style.highContainer}>
      {/*ESTA ES TODA LA DATA QUE TRAE EL COMPONENETE DE MOMENTO*/}
      <div className={style.infoContainer}>
        <h1 className={style.title}>Hello orld</h1>
        <h4 className={style.description}>Una description</h4>
      </div>
      {/*ACA IRIA EL COMPONENTE QUE TIENE QUE CREAR JOHAN CON EL EDITOR DE CODIGO Y EL TEST O GRAFICO*/}
    </div>
  )
}


export default LessonPage
