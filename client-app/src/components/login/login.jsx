import axios from 'axios'
import jwt_decode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import style from './login.module.css'
import { validation } from '../../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import ForgotPopUp from "./popUp/forgotPasswordPopUp.jsx";


const validator = (input) => {
  const error = {}

  if (!input.email) {
    error.email = 'email is required'
  } else if (!/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(input.email)) {
    error.email = 'email is invalid'
  }

  if (!input.password) {
    error.password = 'password is required'
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input.password)) {
    error.password = 'Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number'
  }

  return error
}

function Login () {

  const user = useSelector(store => store.user);
  const isLogged = useSelector(store => store.isLogged);

  const dispatch = useDispatch();

  const [input, setInput] = useState({})
  const [error, setError] = useState({})
  const [logError, setLogError] = useState({})
  const [forgotPopUp, setForgotPopUp] = useState(false)

  const workOnChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })

    setError(validator({
      ...input,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = async (event) => {
    function isObjectEmpty (obj) {
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) return false
      }
      return true
    }

    if (!isObjectEmpty(error) || isObjectEmpty(input)) {
      event.preventDefault()

      setError(validator({
        ...input,
        [event.target.name]: event.target.value
      }))
    } else {
          event.preventDefault()

        const response = await dispatch(validation({email: input.email, password: input.password}))
        if(response.success) {
          let location = window.location.href + 'home'
           location = location.split('login')
           window.location.href = location[0] + location[1]
          } else {
            setLogError({err: "El email o contraseña es incorrecto"})
          }
    }
  }

  const handleSingOut = (event) => {
    setUser({})
    document.getElementById('signInDiv').hidden = false
  }

  const handleCallBackResponse = async (response) => {
    const userObject = jwt_decode(response.credential)

    if (userObject.email_verified) {
      try {
        setLogError({})
        let location = window.location.href + 'home'
        location = location.split('login')
        window.location.href = location[0] + location[1]
      } catch (err) {
        setLogError({ err })
      }
    }
  }

  const popUpFunction = (bool) => {
    setForgotPopUp(bool)
  }

  useEffect(() => {
  /* global google */
    google.accounts.id.initialize({
      client_id: '759322645352-ch2qqv99md1ts29e7spp1cjs6o4ri5df.apps.googleusercontent.com',
      callback: handleCallBackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    )

    google.accounts.id.prompt()
  }, [])

  return (
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
          </div>
        </div>
      </div>
      {/*Codition open popUp or Close popUp*/}
      {forgotPopUp ? <ForgotPopUp popUpFunction={popUpFunction}/> : null};
    </div>

  )
}

export default Login
