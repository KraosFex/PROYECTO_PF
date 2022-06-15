
import style from './popUp.module.css';
import { AiFillCloseCircle } from 'react-icons/ai';

const PopUp = () => {

  return(
    <div className={style.overlay}>
      <div className={style.pop_up}>
        <div className={style.close_and_title}>
          <a href='#' id="btn_close_popup" className={style.btn_close_popup}><AiFillCloseCircle className={style.icon} /></a>
          <h2>Cambia tu nombre de usuario</h2>
        </div>
        <h4>Introduce un nuevo nombre de usuario y tu constraseña existente.</h4>
        <form className={style.form}>
          <div className={style.inputs_container}>
            <input type="text" placeholder="New username"></input>
            <input type="password" placeholder="Your password"></input>
          </div>
          <input type="submit" value="Listo"></input>
        </form>
      </div>
    </div>
  )

}

export default PopUp;
