import { useState } from "react";
import { register, auhtGoogle } from "../../../redux/actions";
import style from "./register.module.css";
import validator from "../../utils/validator.js";
import { useNavigate, Link, NavLink } from "react-router-dom";
import Google from "../../icons/google";
import { useDispatch } from 'react-redux';

function Register() {

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const [registerError, setRegisterError] = useState({});

  const workOnChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setError(
      validator("register", {
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
        validator("register", {
          ...input,
          [event.target.name]: event.target.value,
        })
      );
    } else {
      event.preventDefault();

      const response = await dispatch(
        register({
          name: input.name,
          username: input.username,
          email: input.email,
          password: input.password,
        })
      );

      if (response.success) {
        setRegisterError({});
        localStorage.setItem("authToken", response.token);
        navigateTo("/home")
      } else {
        setRegisterError({ err: response.info });
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
          <h1 className={style.h1}>Registrate</h1>
          <label className={style.label1}>Es facil y rapido</label>
          <div className={style.divs}>
            <input name="name" placeholder="Nombre" className={style.inputs} />
          </div>
          {error.name && <label className={style.errors}>{error.name}</label>}

          <div className={style.divs}>
            <input
              name="username"
              placeholder="Usuario"
              className={style.inputs}
            />
          </div>
          {error.username && (
            <label className={style.errors}>{error.username}</label>
          )}

          <div className={style.divs}>
            <input
              name="email"
              type="email"
              placeholder="ejemplo@gmail.com"
              className={style.inputs}
            />
          </div>
          {error.email && <label className={style.errors}>{error.email}</label>}

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
            <label className={style.errors}>{error.password}</label>
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
            <label className={style.errors}>{error.confirmPassword}</label>
          )}

          <div className={style.btns}>
            <input type="submit" value="Crear" className={style.send} />
            {registerError.err && (
              <label className={style.errors}>{registerError.err}</label>
            )}
          </div>
        </form>
        <div className={style.signIn}>
          <h1>Ya tienes cuenta?</h1>
          <NavLink to="/login">Sign In</NavLink>
        </div>
        <div className={style.signInGoogle}>
          <h1>O puedes entrar con</h1>
          <NavLink to="/login">
            <Google />
          </NavLink>
        </div>
        <div className={style.policy}>
          <h1>
            This site is protected by reCAPTCHA and the Google{" "}
            <Link to="https://policies.google.com/privacy">
              Privacy Policy{" "}
            </Link>
            and
            <Link to="https://policies.google.com/terms">
              {" "}
              Terms of Service{" "}
            </Link>
            apply.
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Register;
