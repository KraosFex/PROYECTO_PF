import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isPremiumConverter } from "../../../../redux/actions/index";
import { updateUser } from "../../../../redux/reducer";
import { NavLink, useNavigate } from "react-router-dom";
import style from "./success.module.css";

function Success() {
  const token = useSelector((state) => state.reducerCompleto.authToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function axiosReq() {
    const data = await dispatch(isPremiumConverter({ token }));
    dispatch(updateUser(data.payload.updateUser));
  }
  useEffect(() => {
    axiosReq();
  }, []);
  return (
    <div className={style.hightContainer}>
      <h1></h1>
      <NavLink to="/home">Volver al Inicio</NavLink>
      {/*SE PODRIA PONER UNA IMAGEN O UN FONDO LINDO PARA QUE NO QUEDE TAN VACIO*/}
    </div>
  );
}

export default Success;
