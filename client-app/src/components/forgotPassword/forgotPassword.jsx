import { useState } from "react";
import style from "./forgotPassword.module.css";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import validator from "../../utils/validator.js";
import axios from 'axios';
import { updateUser } from '../../../redux/reducer';
import { useDispatch } from 'react-redux';

function ForgotPassword() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const [passwordError, setPasswordError] = useState({});


  const workOnChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setError(
      validator("forgot", {
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = async (event) => {
    function isObjectEmpty(obj) {
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
      }
      return true;
    }


    if (!isObjectEmpty(error) || isObjectEmpty(input)) {
      event.preventDefault();

      setError(
        validator("forgot", {
          ...input,
          [event.target.name]: event.target.value,
        })
      );
    } else {
      event.preventDefault();

      const body = {password: input.password}

      try {
          const metaData = await axios.put(`/api/auth/resetpassword/${token}`, body)

  console.log("vamos", metaData.data)
          dispatch(updateUser(metaData.data.updateUser))
          setPasswordError({});
          navigate("/home");

      } catch(err) {
        console.log("chau", err)
          setPasswordError({ err: err.response.data.info });
      }



    }
  };

  return (
        <div className={style.flexContainer}>

            <div className={style.Container}>
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
                            placeholder="Confirmar contraseña"
                            className={style.inputs}
                        />
                    </div>
                    {error.confirmPassword && (
                        <label className={style.error}>{error.confirmPassword}</label>
                    )}

                    <div className={style.btns}>
                    <input type="submit" value="Cambiar Contraseña" className={style.send}></input>
                    {passwordError.err && <label className={style.error}>{passwordError.err}</label>}
                    </div>

                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
