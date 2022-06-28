import style from "./forgotPopUp.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { editPassword } from "../../../../redux/actions/index";
import { useDispatch } from "react-redux";
import validator from "../../../utils/updateProfileValidator";
import { useState } from "react";

const ForgotPopUp = ({ popUpFunction }) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const [updateError, setUpdateError] = useState({});

  const workOnChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setError(
      validator("password", {
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
        validator("email", {
          ...input,
          [event.target.name]: event.target.value,
        })
      );
    } else {
      event.preventDefault();
      const response = await dispatch(editPassword(input.email));

      if (response.success) {
        setInput({
          ...input,
          success: response.info,
        });
      } else {
        setUpdateError({ err: response.info });
      }
    }
  };

  return (
    <div className={style.overlay}>
      <div className={style.pop_up}>
        <div className={style.close_and_title}>
          <a
            href="#"
            id="btn_close_popup"
            className={style.btn_close_popup}
            onClick={() => popUpFunction(false)}
          >
            <AiFillCloseCircle className={style.icon} />
          </a>
          <h2>Recupera tu cuenta</h2>
        </div>
        <h4>
          Introduce tu mail para recibir el formulario de restauracion de
          contraseña.
        </h4>
        <form
          className={style.form}
          onSubmit={(e) => handleSubmit(e)}
          onChange={(e) => workOnChange(e)}
        >
          <div className={style.inputs_container}>
            <input type="text" placeholder="Email" name="email"></input>
            {error.email && (
              <label className={style.error}>{error.email}</label>
            )}
          </div>
          <input type="submit" value="Listo"></input>
          {input.success && (
            <label className={style.success}>{input.success}</label>
          )}
          {updateError.err && (
            <label className={style.error}>{updateError.err}</label>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPopUp;
