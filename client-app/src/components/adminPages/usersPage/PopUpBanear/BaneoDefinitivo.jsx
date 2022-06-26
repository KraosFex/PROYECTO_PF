import style from './popUp.module.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useState } from 'react';
import { BanearDef } from '../../../../../redux/actions';


export default function BanearDefini({ popUpFunction, id, cancel }) {
    if(!cancel){cancel= false}
    
    const [boton, setboton] = useState(true)
    const [error, setError] = useState({})
    async function  Submit(e) {
        e.preventDefault()
        setboton(false) 
        let errores = await BanearDef(id, cancel)()
        setError(errores)
        console.log(errores)
    }


    return (
        <div className={style.overlay}>
            <div className={style.pop_up}>
                <div className={style.close_and_title}>
                    <a href='#' id="btn_close_popup" className={style.btn_close_popup} onClick={() => popUpFunction(false,"delete")}><AiFillCloseCircle className={style.icon} /></a>
                    <h2>Baneo de Usuario</h2>
                </div>
                {cancel? <h4>¿Esta seguro de querer quitar el baneo definitivo al usuario?</h4>: <h4>¿Esta seguro de querer banear definitivamente al usuario?</h4>}
                <form className={style.form} onSubmit={(e) => Submit(e)}>
                     {boton?<input className={style.boton} type="submit" value="Si"></input>:null}
                </form>
                {error.successful ?cancel?<label className={style.label2}>Listo, tu usuario  esta nuevamente activo </label>: <label className={style.label2}>Listo, tu usuario fue baneado </label>:null}
                {error.error ? <label className={style.label} ><p className={style.p}>Hubo un error con la ruta</p><p className={style.p}> Intenta mas tarde o comunicate con los administradores</p></label>:null}
            </div>
        </div>
    )

}