// actions reducer
// actions reducer
import axios from "axios";

export function createNew(input) {
  return async function (dispatch) {
      try{
        const resp = await axios.post("http://localhost:27017/api/users/", input)
        dispatch({
          type: "POST_NEW_USER",
          payload: resp.data.respuesta
        });
      } catch(err) {
          console.log(err);
          alert("Ups! Something went wrong...");
      }
  };
}

export function getCourses() {
  return async function (dispatch) {
    try{
      const resp = await axios.get("http://localhost:3001/api/cursos")
      dispatch({
        type: "GET_COURSES",
        payload: resp.data.respuesta,
      });
    } catch(err) {
      console.log(err);
          alert("Ups! Something went wrong...");
    }
  };
}

export function getCourseByName(name) {
  return async function (dispatch) {
      try{
        const resp = await axios.get(`http://localhost:3001/api/cursos/${name}`)
        dispatch({
          type: "GET_COURSEBYNAME",
          payload: resp.data.respuesta,
        })
      } catch(erro) {
        console.log(err);
        alert("Ups! Something went wrong...");
      }
  };
}

