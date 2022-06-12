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
        LOGOUT
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

export const createNew = (input) => {
  return async dispatch => {
      try{
        const resp = await axios.post("http://localhost:3001/api/users/", input)
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
    try {
      const metaData = await axios.post("http://localhost:3001/api/auth", post)
      const data = {user: metaData.data.user, token: metaData.data.token}
      dispatch(setValidateUser(data))
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
