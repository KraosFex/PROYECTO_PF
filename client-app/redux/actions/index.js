// actions reducer
import axios from "axios";

export const createNew = (input) => {
  return async dispatch => {
      try{
        const resp = await axios.post("http://localhost:27017/api/users/", input)
        dispatch({
          type: "POST_NEW_USER",
          payload: resp.data,
        });
      } catch(err) {
          console.log(err);
          alert("Ups! Something went wrong...");
      }
  };
}

// Esta accion aun no esta lista. mañana en la mañana esta completo todo
// export const getUser = () => {
//   return async dispatch => {
//     const resp = await axios.get("http://localhost:3001/api/getUsers")
//     dispatch({
//       type:"USER",
//       payload:resp.data
//     })
//   }
// }

export const getCourses = () => {
  return async dispatch => {
    try{
      const resp = await axios.get("http://localhost:3001/api/cursos")
      dispatch({
        type: "GET_COURSES",
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
          type: "GET_COURSEBYNAME",
          payload: resp.data,
        })
      } catch(erro) {
        console.log(err);
        alert("Ups! Something went wrong...");
      }
  };
}

