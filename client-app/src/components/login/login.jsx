// libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// redux actions
import { login, auhtGoogle } from "../../../redux/actions/index";
import { setAuthToken } from "../../../redux/reducer";

// childrend component
import ForgotPopUp from "./popUp/forgotPasswordPopUp.jsx";

// utills
import validator from "../../utils/validator.js";
import { NavLink } from "react-router-dom";

// styles
import style from "./login.module.css";

function Login() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const [logError, setLogError] = useState({});
  const [forgotPopUp, setForgotPopUp] = useState(false);

  const workOnChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setError(
      validator("login", {
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
        validator("login", {
          ...input,
          [event.target.name]: event.target.value,
        })
      );
    } else {
      event.preventDefault();

      const dis = await dispatch(
        login({ email: input.email, password: input.password })
      );
      var response = dis.payload;
      if (response.success === true) {
        setLogError({});
        navigateTo("/home");
      } else {
        setLogError({ err: response.info });
      }
    }
  };

  const handleCallBackResponse = async (response) => {
    const dis = await dispatch(auhtGoogle(response.credential));
    const data = dis.payload;
    if (data.success) {
      setLogError({});
      navigateTo("/home");
    } else {
      setLogError({ err: data.info });
    }
  };

  const popUpFunction = (bool) => {
    setForgotPopUp(bool);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "759322645352-ch2qqv99md1ts29e7spp1cjs6o4ri5df.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  return (
    <div className={style.body}>
      <div className={style.HeightContainer}>
        <div className={style.parentContainer}>
          <div className={style.childContainer}>
            <img
              src="https://i.imgur.com/98pNMkQ.png"
              alt="logo"
              referrerPolicy="no-referrer"
            />
            <h3>Aprende a programar desde cero con tests en tiempo real</h3>
            <div className={style.imgContainer}>
              <img src="../../img/programming.png" />
            </div>
          </div>
          <div className={style.childContainer}>
            <h1>Entrar</h1>
            {logError.err && (
              <label className={style.logError}>{logError.err}</label>
            )}
            <form
              className={style.form}
              onChange={(e) => workOnChange(e)}
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className={style.input}>
                <label className={style.title}>Email</label>
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  name="email"
                />
                {error.email && (
                  <label className={style.error}>{error.email}</label>
                )}
              </div>
              <div className={style.input}>
                <label className={style.title}>Contraseña</label>
                <input type="password" placeholder="password" name="password" />
                {error.password && (
                  <label className={style.error}>{error.password}</label>
                )}
              </div>
              <button type="submit" className={style.button2}>
                <span />
                <span />
                <span />
                <span />
                Entrar
              </button>
            </form>
            {/*PopUp Trigger*/}
            <a onClick={() => popUpFunction(true)} className={style.forgot}>
              Olvidaste la contraseña?
            </a>
            <div className={style.buttons}>
              <NavLink to="/register" className={style.forgot}>
                {" "}
                Registrarse
              </NavLink>

              <NavLink to="/home" className={style.forgot}>
                {" "}
                Volver al inicio
              </NavLink>
            </div>
            <label className={style.googleLabel}>
              O puedes entrar con tu cuenta de google
            </label>
            <div className={style.googleInput}>
              <div id="signInDiv" />
            </div>
          </div>
        </div>
        {/*Codition open popUp or Close popUp*/}
        {forgotPopUp ? <ForgotPopUp popUpFunction={popUpFunction} /> : null};
      </div>
    </div>
  );
}

export default Login;
