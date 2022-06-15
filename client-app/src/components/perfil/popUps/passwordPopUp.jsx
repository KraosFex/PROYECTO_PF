
import style from './popUp.module.css';
import { AiFillCloseCircle } from 'react-icons/ai';
//import { updateProfile } from '../../../../redux/actions';
import { useDispatch } from 'react-redux';
import validator from '../../../utils/updateProfileValidator';
import { useState } from 'react';


const PasswordPopUp = ({popUpFunction}) => {

 const dispatch = useDispatch();

 const [input, setInput] = useState({})
 const [error, setError] = useState({})
 const [updateError, setUpdateError] = useState({})

 const workOnChange = (event) => {
   setInput({
     ...input,
     [event.target.name]: event.target.value
   })

   setError(validator( "password", {
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

     setError(validator("password", {
       ...input,
       [event.target.name]: event.target.value
     }))
   } else {
         event.preventDefault()
         alert("good ending")
         //A la espera de la creacion de la action
/*
       const response = await dispatch(validation({email: input.email, password: input.password}))
       if(response.success) {
         let location = window.location.href + 'home'
          location = location.split('login')
          window.location.href = location[0] + location[1]
         } else {
           setLogError({err: "El email o contraseña es incorrecto"})
         }*/
   }
 }

  return(
    <div className={style.overlay}>
      <div className={style.pop_up}>
        <div className={style.close_and_title}>
          <a href='#' id="btn_close_popup" className={style.btn_close_popup} onClick={() => popUpFunction("password", false)}><AiFillCloseCircle className={style.icon} /></a>
          <h2>Actualiza tu contraseña</h2>
        </div>
        <h4>Introduce tu contraseña actual y una nueva contraseña.</h4>
        <form className={style.form} onSubmit={(e) => handleSubmit(e)} onChange={(e) => workOnChange(e)}>
          <div className={style.inputs_container}>
            <input type="password" placeholder="Contraseña actual" name="password"></input>
            {error.password && <label className={style.error}>{error.password}</label>}
            <input type="password" placeholder="Nueva contraseña" name="newPassword"></input>
            {error.newPassword && <label className={style.error}>{error.newPassword}</label>}
          </div>
          <input type="submit" value="Listo"></input>
          {updateError.err && <label className={style.updateError}>{updateError.err}</label>}
        </form>
      </div>
    </div>
  )

}

export default PasswordPopUp;
