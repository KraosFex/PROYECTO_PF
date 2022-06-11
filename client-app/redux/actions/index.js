// import methods
import axios from "axios";

// actions types
import { 
        POST_NEW_USER,
        VALIDATE_USER,
        GET_COURSES,
        GET_COURSEBYNAME 
      } from "./Actions types/actionTypes";


// actions
export const createNew = (input) => {
  return async dispatch => {
      try{
        const resp = await axios.post("http://localhost:27017/api/users/", input)
        dispatch({
          type: POST_NEW_USER,
          payload: resp.data,
        });
      } catch(err) {
          console.log(err);
          alert("Ups! Something went wrong...");
      }
  };
}

// Esta accion aun no esta lista. mañana en la mañana esta completo todo
export const validation = (post) => {
  return async dispatch => {
    const resp = await axios.post("http://localhost:3001/api/auth", post)
    dispatch({
      type: VALIDATE_USER,
      payload:resp.data
    })
  }
}

export const getCourses = () => {
  return async dispatch => {
    try{
      const resp = await axios.get("http://localhost:3001/api/cursos")
      dispatch({
        type: GET_COURSES,
        payload: resp.data,
      });
    } catch(err) {
      console.log(err);
      alert("Ups! Something went wrong...");
    }
  };
}

export const getCourseByName = (name) => {
  return async function (dispatch) {
      try{
        const resp = await axios.get(`http://localhost:3001/api/cursos/${name}`)
        dispatch({
          type: GET_COURSEBYNAME,
          payload: resp.data,
        })
      } catch(erro) {
        console.log(err);
        alert("Ups! Something went wrong...");
      }
  };
}

