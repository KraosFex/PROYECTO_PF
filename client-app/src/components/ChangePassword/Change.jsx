
import { useState } from "react";
import validator from "../../utils/validator";
import { ResetearContraseña } from "../../../redux/actions";
import style from "./Change.module.css";
import { NavLink, useParams } from "react-router-dom";

export default function ChangePassw() {
    let token = useParams().token

    const [input, setInput] = useState({});
    const [error, setError] = useState({});
    const [registerError, setRegisterError] = useState({});

    const workOnChange = (event) => {
        if (event.target.name === "password") {
            setError(validator("contraseña", {
                ...input,
                [event.target.name]: event.target.value,
            }))
        }
        else if (event.target.name === "confirmPassword") {
            if (input.password !== event.target.value) {
                setError({ ...error, confirmPassword: "Las contraseñas deben coincidir" }); return
            } if (input.password === event.target.value) {
                setError({ ...error, confirmPassword: null }); return
            }
        }
        setInput({
            ...input,
            [event.target.name]: event.target.value,
        })
    };
    const handleSubmit = async (event) => {

        event.preventDefault()
        let info = await ResetearContraseña(token, input.password)()
        console.log(info)
        setRegisterError(info)
    }

    return (
        <div className={style.flexContainer}>

            <div className={style.Container}><div className={style.home}>
                <NavLink to="/home">Volver al inicio</NavLink>
            </div>
                <div className={style.logo}>
                    <img
                        src="https://i.imgur.com/98pNMkQ.png"
                        alt="logo"
                        referrerPolicy="no-referrer"
                    />
                </div>
                <form
                    className={style.form}
                    onSubmit={(e) => handleSubmit(e)}
                    onChange={(e) => workOnChange(e)}
                    id="formul"
                >
                    <h1 className={style.h1}>Cambiar Contraseña</h1>
                    <label className={style.label1}>Por favor recuerda que tiene que tener como minimo: 8 caracteres , 1 mayuscula, 1 minuscula y 1 numero</label>

                    <div className={style.divs}>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Contraseña"
                            className={style.inputs}
                        />
                    </div>
                    {error.password && (
                        <label className={style.error}>{error.password}</label>
                    )}

                    <div className={style.divs}>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Repetir contraseña"
                            className={style.inputs}
                        />
                    </div>
                    {error.confirmPassword && (
                        <label className={style.error}>{error.confirmPassword}</label>
                    )}

                    <div className={style.btns}>
                        {error.password || error.confirmPassword ? null : <input type="submit" value="Cambiar Contraseña" className={style.send} />}
                        {registerError.success ? <NavLink className={style.send} to="/login">LogIn</NavLink> : null}
                    </div>
                    {registerError.info && (
                        <label className={registerError.success ? style.good : style.errors}>{registerError.info}</label>
                    )}
                </form>
            </div>
        </div>
    );
}

