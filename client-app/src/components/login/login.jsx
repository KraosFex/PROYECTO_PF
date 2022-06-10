import React, {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import style from "./login.module.css";
import axios from "axios";

const validator = (input) => {
  let error = {};


  if(!input.email){
    error.email = "email is required";
  } else if (!/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(input.email)){
    error.email = "email is invalid";
  }

  if(!input.password){
    error.password = "password is required";
  } else if (*!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input.password)){
    error.password = "Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number";
  }

  return error;
}


function Login() {

const [input, setInput] = useState({});
const [error, setError] = useState({});
const [user, setUser] = useState({});
const [logError, setLogError] = useState({});

const workOnChange = (event) => {
console.log(event.target.name)
  setInput({
    ...input,
    [event.target.name]: event.target.value,
  })

  setError(validator({
    ...input,
    [event.target.name]: event.target.value,
  }))

}

const handleSubmit = async (event) => {

    function isObjectEmpty(obj) {
      for(const prop in obj){
        if(obj.hasOwnProperty(prop)) return false
      }
      return true
    }

    if(!isObjectEmpty(error) || isObjectEmpty(input)) {

      event.preventDefault();

      setError(validator({
        ...input,
        [event.target.name]: event.target.value,
      }))

    } else {

        event.preventDefault();
        setInput({
          ...input,
          submit: "Actividad Agregada!"
        })

        try {
          const userData = await axios("http://localhost:3001/api/auth", {
            params: {
              email: input.email,
              password: input.password
            }
          })
          setUser(userData)
          setLogError({});
          let location = window.location.href + "home";
          location = location.split("login")
          window.location.href = location[0] + location[1];
        } catch(err) {
          setLogError({err: err});
        }


    }
  }



const handleSingOut = (event) => {
  console.log("click")
  setUser({});
   document.getElementById("signInDiv").hidden = false;
}

const handleCallBackResponse = async (response) => {
 var userObject = jwt_decode(response.credential);


 if(userObject.email_verified) {
   try {
     const userData = await axios("http://localhost:3001/api/auth", {
       params: {
         email: userObject.email,
         password: userObject.sub
       }
     })

     setUser(userObject)
     setLogError({});
     let location = window.location.href + "home";
     location = location.split("login")
     window.location.href = location[0] + location[1];
   } catch(err) {
     setLogError({err: err});
   }
 }

 document.getElementById("signInDiv").hidden = true;
}

useEffect(() =>{
  /*global google */
  google.accounts.id.initialize({
    client_id: "759322645352-ch2qqv99md1ts29e7spp1cjs6o4ri5df.apps.googleusercontent.com",
    callback: handleCallBackResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    { theme: "outline", size: "large" }
  )

  google.accounts.id.prompt();
}, []);

console.log(logError);
console.log(user);

  return (
    <div className={style.HeightContainer}>
      <div className={style.parentContainer}>
        <div className={style.childContainer}>
          <h3>Lorem ipsum dolor sit amet, vivamus eu augue erat. Donec rutrum suscipit muris at blandit. Vestibulum loborti varius feugiat. Quisque at varius nibh</h3>
          <div className={style.imgContainer}>
            <img src="../../img/rocketLogin.png" />
          </div>
        </div>
        <div className={style.childContainer}>
          <h1>Sign In</h1>
          {logError.err && <label className={style.logError}>{logError.err.response.data.info}</label>}
          <form className={style.form} onChange={(e) => workOnChange(e)} onSubmit={(e) => handleSubmit(e)}>
            <div className={style.input} >
              <label className={style.title}>EMAIL</label>
              <input type="text" placeholder="example@gmail.com" name="email"></input>
              {error.email && <label className={style.error}>{error.email}</label>}
            </div>
            <div className={style.input} >
              <label className={style.title}>PASSWORD</label>
              <input type="password" placeholder="password" name="password"></input>
              {error.password && <label className={style.error}>{error.password}</label>}
            </div>
            <button type="submit" className={style.button2}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              SIGN IN
            </button>
          </form>
          <label className={style.googleLabel}>Or sign in With your google account</label>
          <div className={style.googleInput}>
            <div id="signInDiv"></div>
            </div>
        </div>
      </div>
    </div>

  )
}

export default Login;
