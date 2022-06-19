<<<<<<< HEAD
import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import style from "./login.module.css";
import { validation } from "../../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import ForgotPopUp from "./popUp/forgotPasswordPopUp.jsx";
import validator from "../../utils/validator.js";
import { Navigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const [logError, setLogError] = useState({});
  const [forgotPopUp, setForgotPopUp] = useState(false);
=======
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import style from './login.module.css'
import { validation } from '../../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import ForgotPopUp from "./popUp/forgotPasswordPopUp.jsx";
import validator from "../../utils/validator.js";
import { Navigate } from 'react-router-dom'

function Login () {

  const dispatch = useDispatch();

  const [input, setInput] = useState({})
  const [error, setError] = useState({})
  const [logError, setLogError] = useState({})
  const [forgotPopUp, setForgotPopUp] = useState(false)
>>>>>>> 1be860b2a19cc436c0e18551cdb7b03808c791cf

  const workOnChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

<<<<<<< HEAD
    setError(
      validator("login", {
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };
=======
    setError(validator("login", {
      ...input,
      [event.target.name]: event.target.value
    }))
  }
>>>>>>> 1be860b2a19cc436c0e18551cdb7b03808c791cf

  const handleSubmit = async (event) => {
    function isObjectEmpty(obj) {
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
      }
      return true;
    }

    if (!isObjectEmpty(error) || isObjectEmpty(input)) {
      event.preventDefault();

<<<<<<< HEAD
      setError(
        validator("login", {
          ...input,
          [event.target.name]: event.target.value,
        })
      );
=======
      setError(validator("login", {
        ...input,
        [event.target.name]: event.target.value
      }))
>>>>>>> 1be860b2a19cc436c0e18551cdb7b03808c791cf
    } else {
      event.preventDefault();

<<<<<<< HEAD
      const response = await dispatch(
        validation({ email: input.email, password: input.password })
      );
      if (response.success) {
        localStorage.setItem("authToken", response.token);
        setLogError({});
        <Navigate to="/home" />;
      } else {
        setLogError({ err: response.info });
      }
    }
  };
=======
        const response = await dispatch(validation({email: input.email, password: input.password}))
        if(response.success) {
            localStorage.setItem("authToken", response.token)
            setLogError({});
            <Navigate to='/home' />
          } else {
            setLogError({err: response.info});
          }
    }
  }
>>>>>>> 1be860b2a19cc436c0e18551cdb7b03808c791cf

  const handleCallBackResponse = async (response) => {
    const userObject = jwt_decode(response.credential);

    if (userObject.email_verified) {
      try {
        setLogError({});
<<<<<<< HEAD
        <Navigate to="/home" />;
      } catch (err) {
        setLogError({ err: err });
=======
        <Navigate to='/home' />
      } catch (err) {
        setLogError({err: err});
>>>>>>> 1be860b2a19cc436c0e18551cdb7b03808c791cf
      }
    }
  };

  const popUpFunction = (bool) => {
    setForgotPopUp(bool);
  };

  const popUpFunction = (bool) => {
    setForgotPopUp(bool)
  }

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
<<<<<<< HEAD
    <body className={style.body}>
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
            <h1>Sign In</h1>
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
            <label className={style.googleLabel}>
              O puedes entrar con tu cuenta de google
            </label>
            <div className={style.googleInput}>
              <div id="signInDiv" />
            </div>
=======
    <div className={style.HeightContainer}>
      <div className={style.parentContainer}>
        <div className={style.childContainer}>
          <h3>Lorem ipsum dolor sit amet, vivamus eu augue erat. Donec rutrum suscipit muris at blandit. Vestibulum loborti varius feugiat. Quisque at varius nibh</h3>
          <div className={style.imgContainer}>
            <img src='../../img/rocketLogin.png' />
          </div>
        </div>
        <div className={style.childContainer}>
          <h1>Sign In</h1>
          {logError.err && <label className={style.logError}>{logError.err}</label>}
          <form className={style.form} onChange={(e) => workOnChange(e)} onSubmit={(e) => handleSubmit(e)}>
            <div className={style.input}>
              <label className={style.title}>EMAIL</label>
              <input type='text' placeholder='example@gmail.com' name='email' />
              {error.email && <label className={style.error}>{error.email}</label>}
            </div>
            <div className={style.input}>
              <label className={style.title}>PASSWORD</label>
              <input type='password' placeholder='password' name='password' />
              {error.password && <label className={style.error}>{error.password}</label>}
            </div>
            <button type='submit' className={style.button2}>
              <span />
              <span />
              <span />
              <span />
              SIGN IN
            </button>
          </form>
          {/*PopUp Trigger*/}
          <a onClick={() => popUpFunction(true)}>Forgot password?</a>
          <label className={style.googleLabel}>Or sign in With your google account</label>
          <div className={style.googleInput}>
            <div id='signInDiv' />
>>>>>>> 1be860b2a19cc436c0e18551cdb7b03808c791cf
          </div>
        </div>
        {/*Codition open popUp or Close popUp*/}
        {forgotPopUp ? <ForgotPopUp popUpFunction={popUpFunction} /> : null};
      </div>
<<<<<<< HEAD
    </body>
  );
=======
      {/*Codition open popUp or Close popUp*/}
      {forgotPopUp ? <ForgotPopUp popUpFunction={popUpFunction}/> : null};
    </div>

  )
>>>>>>> 1be860b2a19cc436c0e18551cdb7b03808c791cf
}

export default Login;
