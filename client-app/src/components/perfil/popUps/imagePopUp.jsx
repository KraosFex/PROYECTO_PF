import style from "./popUp.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { editImage } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import validator from "../../../utils/updateProfileValidator";
import { useState } from "react";

const ImagePopUp = ({ popUpFunction }) => {
  const token = useSelector((state) => state.reducerCompleto.authToken);

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
      validator("URL", {
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
        validator("URL", {
          ...input,
          [event.target.name]: event.target.value,
        })
      );
    } else {
      event.preventDefault();
      const response = await dispatch(editImage({ token, url: input.URL }));
      console.log(input.url);

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
            onClick={() => popUpFunction("image", false)}
          >
            <AiFillCloseCircle className={style.icon} />
          </a>
          <h2>Cambia la imagen de tu perfil</h2>
        </div>
        <h4>
          Introduce una URL de una imagen que quieras que aparezca en tu perfil.
        </h4>
        <form
          className={style.form}
          onSubmit={(e) => handleSubmit(e)}
          onChange={(e) => workOnChange(e)}
          autoComplete="off"
        >
          <div className={style.inputs_container}>
            <input type="text" placeholder="URL" name="URL"></input>
            {error.URL && <label className={style.error}>{error.URL}</label>}
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

export default ImagePopUp;
