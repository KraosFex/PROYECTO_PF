
import style from './popUp.module.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { editPassword } from '../../../../redux/actions';
import { useDispatch } from 'react-redux';
import validator from '../../../utils/updateProfileValidator';
import { useState } from 'react';


const PasswordPopUp = ({popUpFunction, email}) => {

 const dispatch = useDispatch();

 const [input, setInput] = useState({email})
 const [error, setError] = useState({})
 const [updateError, setUpdateError] = useState({})

 const workOnChange = (event) => {
  updateError({})
   setInput({
     ...input,
     success:false,
     [event.target.name]: event.target.value
   })

   setError(validator( "email", {
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

     setError(validator("email", {
       ...input,
       [event.target.name]: event.target.value
     }))
   } else {
       event.preventDefault()
       const response = await dispatch(editPassword(input.email))
       if(response.success) {
           setInput({
             ...input,
             success: response.info
           })
       } else {
         setUpdateError({err: response.data})
       }
   }
 }

  return(
    <div className={style.overlay}>
      <div className={style.pop_up}>
        <div className={style.close_and_title}>
          <a href='#' id="btn_close_popup" className={style.btn_close_popup} onClick={() => popUpFunction("password", false)}><AiFillCloseCircle className={style.icon} /></a>
          <h2>Actualiza tu contraseña</h2>
        </div>
        <h4>Confirma tu email para recibir el link de cambio de contraseña.</h4>
        <form className={style.form} onSubmit={(e) => handleSubmit(e)} onChange={(e) => workOnChange(e)}>
          <div className={style.inputs_container}>
            <input type="text" placeholder="Email" defaultValue={email} name="email"></input>
            {error.email && <label className={style.label}>{error.email}</label>}
          </div>
          <input className={style.send} type="submit" value="Listo"></input>
          {input.success && <label className={style.label2}>{input.success}</label>}
          {updateError.err && <label className={style.label}>{updateError.err}</label>}
        </form>
      </div>
    </div>
  )

}

export default PasswordPopUp;
