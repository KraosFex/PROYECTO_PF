import React, { useState } from "react";
import { createNew } from "../../../redux/actions";
import style from "./register.module.css";
import { NavLink, Link } from "react-router-dom";
import Google from "../../icons/google";

function Validate(input) {
  const errores = {};
  if (
    input.name !== "" &&
    input.password !== "" &&
    input.email !== "" &&
    input.password2 !== ""
  ) {
    if (!/\S+\d+\W/.test(input.password)) {
      errores.password = "Must have a special symbol and at least one number";
    }
    if (input.password !== input.password2) {
      errores.password = "Passwords must match";
    }
    return errores.password ? errores : null;
  }
  if (input.name === "") {
    errores.name = "The name is required";
  }
  if (input.password === "") {
    errores.password = "The password is required";
  }
  if (input.password2 === "") {
    errores.password = "The password is required";
  }
  if (input.email === "") {
    errores.email = "The email is required";
  }
  return errores;
}

function Register() {
  const [input, setInput] = React.useState({
    name: "",
    password: "",
    password2: "",
    email: "",
    Image: "",
  });
  const [errores, seterrores] = useState({});

  const Submitiar = (e) => {
    e.preventDefault();
    const errorfind = Validate(input);
    if (!errorfind) {
      createNew(input).then((data) => seterrores(data));
    } else {
      seterrores(errorfind);
    }
    console.log(errores);
  };
  const Reset = () => {
    const formulario = document.getElementById("formul");
    formulario.reset();
    setInput({ name: "", password: "", email: "", Image: "" });
  };
  const Visible = () => {
    const password = document.getElementById("pasw");
    const password2 = document.getElementById("pasw2");
    if (password.type === "password") {
      password.type = "text";
      password2.type = "text";
    } else {
      password.type = "password";
      password2.type = "password";
    }
  };
  const Changes = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
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
        <form className={style.form} onSubmit={(e) => Submitiar(e)} id="formul">
          <h1 className={style.h1}>Registrate</h1>
          <label className={style.label1}>Es facil y rapido</label>
          <div className={style.divs}>
            <input
              name="name"
              placeholder="Nombre"
              className={style.inputs}
              onChange={(e) => Changes(e)}
              required
            />
          </div>
          {errores.name ? (
            <label className={style.errors}>{errores.name}</label>
          ) : null}

          <div className={style.divs}>
            <input
              name="email"
              type="email"
              onChange={(e) => Changes(e)}
              placeholder="ejemplo@gmail.com"
              className={style.inputs}
              required
            />
          </div>
          {errores.email ? (
            <label className={style.errors}>{errores.email}</label>
          ) : null}
          <div className={style.divs}>
            <input
              id="pasw"
              name="password"
              type="password"
              onChange={(e) => Changes(e)}
              placeholder="Contraseña"
              className={style.inputs}
              required
            />
            <label className={style.beye} onClick={(e) => Visible(e)}>
              <img
                alt="1"
                className={style.eye}
                src="https://cdn-icons-png.flaticon.com/512/58/58976.png"
              />
            </label>
          </div>

          <div className={style.divs}>
            <input
              id="pasw2"
              name="password2"
              type="password"
              onChange={(e) => Changes(e)}
              placeholder="Repetir Contraseña"
              className={style.inputs}
              required
            />
          </div>
          {errores.password ? (
            <label className={style.errors}>{errores.password}</label>
          ) : null}
          {/* <div className={style.divimg}>
            Image:{" "}
            <input
              name="Image"
              id="imagen"
              onChange={(e) => Changes(e)}
              type="file"
              accept="image/png, .jpeg, .jpg, image/gif"
              className={style.inputimg}
            />
          </div> */}
          <div className={style.btns}>
            <input type="submit" value="Crear" className={style.send} />
            {errores.good ? (
              <label className={style.send2} onClick={() => Reset()}>
                Clear
              </label>
            ) : null}
          </div>
          {errores.good ? (
            <label className={style.good}>{errores.good}</label>
          ) : null}
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
