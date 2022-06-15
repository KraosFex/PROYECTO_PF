// import methods
import axios from "axios";

// actions types
import {
        POST_NEW_USER,
        SET_COURSES,
        GET_COURSEBYNAME,
        SET_SHOWEDCOURSES,
        SET_VALIDATEUSER,
        SET_THEME,
        LOGOUT,
        SET_UPDATEUSER
      } from "./actionsTypes/actionTypes";


// actions

export const themeSwitcher = (theme) => {
  return {
    type: SET_THEME,
    payload: theme
  }
}

export const setShowedCourses = (courses) => {
      return {
      type: SET_SHOWEDCOURSES,
      payload: courses
    }
}

export const setCourses = (courses) => {
      return {
      type: SET_COURSES,
      payload: courses
    }
}

export const setValidateUser = (userObject) => {
      return {
      type: SET_VALIDATEUSER,
      payload: userObject
    }
}

export const updateUser = (userObject) => {
      return {
      type: SET_UPDATEUSER,
      payload: userObject
    }
}

export async function createNew(input) {
  let newinput = { name: input.name, password: input.password, email: input.email, imagen: input.Image==="" || !input.Image ? "https://img2.freepng.es/20180323/pww/kisspng-computer-icons-clip-art-profile-cliparts-free-5ab5a47b02ff75.0880050915218535630123.jpg": input.Image}
  console.log(newinput)
  let errores = await axios.post("http://localhost:3001/api/auth/register", newinput)
    .then(resp => resp.data).then((a) => { return { good: a.info } })
    .catch((err) => {
      return ({ password: err.response.data });
    });
  return (errores);

};

export function findCourse(id) {
  return async function(dispatch){
    await axios.get(`/api/cursos/${id}`).then(resp => resp.data)
    .then((resp)=>dispatch({type:"GET_CURSE", payload: resp}))
  }
};

export const validation = (post) => {
  return async dispatch => {
    try {
      const metaData = await axios.post("http://localhost:3001/api/auth/login", post)
      dispatch(setValidateUser(metaData.data))
      return metaData.data
    } catch(err) {
      return err
    }
  }
}

export const getCourses = () => {
  return async dispatch => {
    try{
      const metaData = await axios.get("http://localhost:3001/api/cursos")
      dispatch(setCourses(metaData.data));
      dispatch(setShowedCourses(metaData.data));
    } catch(err) {
      console.log(err);
      alert("Ups! Something went wrong...");
    }
  };
}

export const getCourseByName = (name) => {
  return async function (dispatch) {
      try {
        const metaData = await axios.get(`http://localhost:3001/api/cursos/${name}`)
        dispatch(setShowedCourses(metaData.data));
      } catch(err) {
        console.log(err);
        alert("Ups! Something went wrong...");
      }
  };
}

export const logout = () => {
  return{
    type: 'LOGOUT'
  }
}

export const editUsername = (username, id) => {
  return async function (dispatch) {
      try {
        const metaData = await axios.put(`http://localhost:3001/api/usersprivate/${id}/profile`, {username: username}, {authorization: `Bearer ${localStorage.getItem("authToken")}`})
        dispatch(updateUser(metaData.data));
      } catch(err) {
        console.log(err);
        alert("Ups! Something went wrong...");
        return err;
      }
  };
}

export const editPassword = (email) => {
  return async function (dispatch) {
      try {
        const metaData = await axios.put(`http://localhost:3001/api/auth/forgotPassword`, {email: email})
        return metaData.data
      } catch(err) {
        console.log(err);
        alert("Ups! Something went wrong...");
        return err;
      }
  };
}
