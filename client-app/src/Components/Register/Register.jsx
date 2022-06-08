
import NavBar from "../navbar/navBar";
import NavBarUser from "../navbar/navBarUser.jsx";
import style from "./register.module.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { createNew } from "../../../redux/actions";



function Validate(input) {
  let errores = {};
  if (input.name !== "" && input.password !== "" && input.email !== "" && input.password2 !== "") {
    for(i in input.password) {
      if(input.password[i]===" "){errores.password = "Password can't contain blank spaces";}
    }
    if(!/\S+\d+\W/.test(input.password)){errores.password = "Must have a special symbol and at least one number"}
    if(input.password  !== input.password2){errores.password = "Passwords must match"}
    return errores.password ? errores :  (null)
  } if (input.name === "") {
    errores.name = "The name is required"
  } if (input.password === "") {
    errores.password = "The password is required";
  }if (input.password2 === "") {
    errores.password = "The password is required";
  }
  if (input.email === "") {
    errores.email = "The email is required";
  }
  return errores
}

function Register() {
  const dispatch = useDispatch();
  const [input, setInput] = React.useState({
    name: "", password: "",password2: "", Image: null, email: ""
  });
  const [errores, seterrores] = useState({});

  const Submitiar = (e) => {
    e.preventDefault();
    let formulario = document.getElementById('formul');
    let errorfind = Validate(input)
    if (!errorfind) {
      createNew(input)(dispatch);
      seterrores({ good: "User: " + input.name + "  Created!" });
      setInput({ name: "", password: "", Image: null, email: "" });
      formulario.reset();
    } else {
      seterrores(errorfind);
    }
  }
  const Visible=()=>{
    let password = document.getElementById("pasw");
    if(password.type==="password"){ password.type="text"}
    else{password.type="password"}
  }
  const Changes = (e) => {
    if (e.target.name === "img" && e.target.value === "") { setInput({ ...input, img: null }); return }
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <div className={style.Container}>
        <form className={style.form} onSubmit={(e) => Submitiar(e)} id="formul">

          <h1 className={style.h1} >Create an account</h1>
          <label className={style.label1}>Es easy and fast</label>
          <div className={style.divs}>
            Name:<input name="name" placeholder="Insert Name..." className={style.inputs} onChange={(e) => Changes(e)} required />
          </div>
          {errores.name ? <label className={style.errors}>{errores.name}</label> : null}

          <div className={style.divs}>
            Email : <input name="email" type="email" onChange={(e) => Changes(e)} placeholder="example@xxxxxx.com" className={style.inputs} required />
          </div>
          {errores.email ? <label className={style.errors}>{errores.email}</label> : null}
          <div className={style.divs}>
            Password : <button className={style.beye} onClick={(e)=> Visible(e)}><img alt="1" className={style.eye} src= "https://cdn-icons-png.flaticon.com/512/58/58976.png"/></button>
            <input id="pasw" name="password" type="password" onChange={(e) => Changes(e)} placeholder="Insert password..." className={style.inputs} required />
          </div>
          <div className={style.divimg}>
          Repeat password:
            <input name="password2" type="password" onChange={(e) => Changes(e)} placeholder="Repeat password..." className={style.inputs} required />
          </div>
          {errores.password ? <label className={style.errors}>{errores.password}</label> : null}
          <div className={style.divimg}>
            Image: <input name="Image" id="imagen" onChange={(e) => Changes(e)} type="file" accept="image/png, .jpeg, .jpg, image/gif" className={style.inputimg} />
          </div>

          <input type="submit" value="Create" className={style.send}></input>
          {errores.good ? <label className={style.good}>{errores.good}</label> : null}

        </form>
      </div>
      <NavBar />
      <NavBarUser />
    </div>
  );
}

export default Register;