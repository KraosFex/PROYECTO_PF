import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isPremiumConverter } from '../../../redux/actions';
import { NavLink } from 'react-router-dom';

function Success() {

const dispatch = useDispatch();

const [response, setResponse] = useState({});

useEffect(() => {

async function axiosReq() {
  const data = await dispatch(isPremiumConverter())
  setResponse(data)
}

axiosReq();
}, [dispatch])



  return (
    <div className={style.hightContainer}>
      <h1>{response.info}</h1>
      <NavLink to="/home">Volver al Inicio</NavLink>
      {//SE PODRIA PONER UNA IMAGEN O UN FONDO LINDO PARA QUE NO QUEDE TAN VACIO}
    </div>
  )
}
