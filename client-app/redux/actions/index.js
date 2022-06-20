// import methods
import axios from "axios";

// actions types
import {
        SET_COURSES,
        SET_SHOWEDCOURSES,
        SET_VALIDATEUSER,
        SET_THEME,
        LOGOUT,
        SET_UPDATEUSER,
        SET_ALLUSERS,
        SET_SHOWEDUSERS
      } from "./actionsTypes/actionTypes";


// synchronous actions

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

export const setShowedUsers = (users) => {
      return {
      type: SET_SHOWEDUSERS,
      payload: users
    }
}

export const setAllUsers = (users) => {
      return {
      type: SET_ALLUSERS,
      payload: users
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

export const logout = () => {
  return {
    type: LOGOUT,
  }
}

// asynchronous actions

export const register = (userData) => {
  return async () => {
    try {
      const metaData = await axios.post("http://localhost:3001/api/auth/register", userData);
      return metaData.data;
    } catch (err) {
      return err.response.data
    }
  }
};

export const findCourse = (id) => {
  return async function(dispatch)  {
    try {
      const resp = await axios.get(`http://localhost:3001/api/cursos/${id}`)
      return resp.data
    } catch (err) {
      alert('Ups! Something went wrong...')
      new Error(err)
    }
  }
};

export const login = (post) => {
  return async function(dispatch) {
    try {
      const metaData = await axios.post("http://localhost:3001/api/auth/login", post)
      dispatch(setValidateUser(metaData.data.user))
      return metaData.data
    } catch (err) {
      return err.response.data;
    }
  }
}

export const getCourseByName = (name) => {
  return async function (dispatch) {
    try {
      const metaData = await axios.get(`http://localhost:3001/api/cursos/${name}`)
      dispatch(setShowedCourses(metaData.data));
    } catch (err) {
      new Error(err)
      alert("Ups! Something went wrong...");
    }
  };
}

export const findUserByName = (username) => {
  return async function (dispatch) {
    try {
      const config ={
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      }
      let metaData = await axios.get(`http://localhost:3001/api/usersprivate/username?username=${username}`, config );
      dispatch(setShowedUsers(metaData.data));
    }
    catch(err) {
      alert("Ups! Something went wrong...");
    }
  }
}

export const editUsername = (username, id) => {
  return async function (dispatch) {
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      }
    }

    try {
      const metaData = await axios.put(`http://localhost:3001/api/usersprivate/${id}/profile`, { username: username }, config)
      dispatch(updateUser(metaData.data));
      return metaData.data
    } catch (err) {
      alert("Ups! Something went wrong...");
      new Error(err)
    }
  };
}

export const editPassword = (email) => {
  return async function (dispatch) {
    try {
      const metaData = await axios.put(`http://localhost:3001/api/auth/forgotPassword`, { email: email })
      return metaData.data
    } catch (err) {
      alert("Ups! Something went wrong...");
      new Error(err)
    }
  };
}

export const getCourses = () => {
  return async function(dispatch) {
    try {
      const metaData = await axios.get("http://localhost:3001/api/cursos")
      dispatch(setCourses(metaData.data.docs));
      dispatch(setShowedCourses(metaData.data.docs));
    } catch (err) {
      console.log(err);
      alert("Ups! Something went wrong...");
    }
  };
}

export const bookmarkCourse = (id) => {
  return async dispatch => {
    try {
      const resp = await axios.put(`http://localhost:3001/api/${id}/favorite`)
      dispatch(updateUser(resp.data.user))
    } catch (err) {
      alert("Ups! Something went wrong...");
      new Error(err)
    }
  }
}

export const unmarkfavorites = (id) => {
  return async function(dispatch) {
    try {
      const resp = await axios.put(`http://localhost:3001/api/${id}/unfavorite`)
      dispatch(updateUser(resp.data.user))
    } catch (err) {
      alert("Ups! Something went wrong...");
      new Error(err)
    }
  }
}

export const getLesson = (idCourse, idLesson) => {
  return async function (dispatch) {
    try {
      /*A LA ESPERA DE LA CREACION DE LA RUTA*/
      const metaData = await axios(`http://localhost:3001/api/cursos/${idCourse}`, idLesson);
      return metaData.data

    } catch (err) {
      alert("Algo no va pa");
      return err;
    }
  }
}


export const addVotes = async function (id, info){
  try {
    const data = await axios.put(`http://localhost:3001/api/cursosprivate/${id}/votes`, info)
  } catch (err) {
    new Error(err)
  }
}

export const getAllUsers = () => {
  return async function(dispatch) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
            }
          }

      const metaData = await axios(`http://localhost:3001/api/usersprivate/`, null, config);
      dispatch(setAllUsers(metaData.data.docs));
      dispatch(setShowedUsers(metaData.data.docs))

    }catch(err) {
      alert("Algo no va pa");
      return err;
    }
  }
}

export const auhtGoogle = (tokenId) => {
  return async function(dispatch) {
    try {
      const metaData = await axios.post("http://localhost:3001/api/auth/googlelogin", {tokenId});
      dispatch(setValidateUser(metaData.data.user));
      return metaData.data
    } catch (err) {
      return err.response.data;
    }
  }
}
