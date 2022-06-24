import style from './popUp.module.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useState } from 'react';
import { Banear } from '../../../../../redux/actions';


export default function BanearPopUp({ popUpFunction, id }) {
    let today1 = new Date();
    let today = today1.toDateString().split(" ")
    let [mes, dia, año] = [today1.getMonth() + 1, today[2], today[3]]
    if (mes < 10) { mes = `0${mes}` }

    const [fecha, setfecha] = useState(``)
    const [error, setError] = useState({})

    const workOnChange = (e) => {
        setfecha(e.target.value)
        setError({})
    }

    async function  Submit(e) {
        e.preventDefault()
        let date = new Date(fecha).toDateString().split(" ");
        date = `${date[1]} ${1 + parseInt(date[2])} ${date[3]}`
        let errores = await Banear(id, date)()
        setError(errores)
        console.log(errores)
    }


    return (
        <div className={style.overlay}>
            <div className={style.pop_up}>
                <div className={style.close_and_title}>
                    <a href='#' id="btn_close_popup" className={style.btn_close_popup} onClick={() => popUpFunction(false)}><AiFillCloseCircle className={style.icon} /></a>
                    <h2>Baneo de Usuario</h2>
                </div>
                <h4>Introduce la fecha hasta la que se baneara al usuario</h4>
                <form className={style.form} onSubmit={(e) => Submit(e)} onChange={(e) => workOnChange(e)}>
                    <div className={style.inputs_container}>
                        <input type="date" name="fecha" defaultValue={`${año}-${mes}-${dia - 1}`} min={`${año}-${mes}-${dia}`}></input>
                    </div>
                    {fecha !== "" && <input className={style.boton} type="submit" value="Listo"></input>}
                </form>
                {error.successful ? <label className={style.label2}>Listo, tu usuario fue baneado hasta {fecha}</label>:null}
                {error.error ? <label className={style.label} ><p className={style.p}>Hubo un error con la ruta</p><p className={style.p}> Intenta mas tarde o comunicate con los administradores</p></label>:null}
            </div>
        </div>
    )

}
