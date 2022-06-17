// import methods
import axios from "axios";

// actions types
import {
        SET_COURSES,
        GET_COURSEBYNAME,
        SET_SHOWEDCOURSES,
        SET_VALIDATEUSER,
        SET_THEME,
        LOGOUT,
        GET_CURSE,
        SET_UPDATEUSER,
        BOOKMARCOURSE
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
  return{
    type: LOGOUT,
  }
}

// asynchronous actions

export const register = (userData) => {
  return async () => {
    try {
      const metaData = await axios.post("http://localhost:3001/api/auth/register", userData);
      return metaData;
    } catch(err) {
        alert('Ups! Something went wrong...')
        new Error(err)
      }
  }
};

export const findCourse = (id) => {
  return async dispatch => {
    try{
      const resp = await axios.get(`http://localhost:3001/api/cursos/${id}`)
      dispatch({
        type: GET_CURSE, 
        payload: resp.data
      })
    }catch(err){
      alert('Ups! Something went wrong...')
      new Error(err)
    }
  }
};

export const validation = (post) => {
  return async dispatch => {
    try {
      const metaData = await axios.post("http://localhost:3001/api/auth/login", post)
      dispatch(setValidateUser(metaData.data))
      return metaData.data
    } catch(err) {
      new Error(err)
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
      new Error(err)
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
        new Error(err)
        alert("Ups! Something went wrong...");
      }
  };
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
        const metaData = await axios.put(`http://localhost:3001/api/usersprivate/${id}/profile`, {username: username}, config)
        dispatch(updateUser(metaData.data));
        return metaData.data
      } catch(err) {
        alert("Ups! Something went wrong...");
        new Error(err)
      }
  };
}

export const editPassword = (email) => {
  return async function (dispatch) {
      try {
        const metaData = await axios.put(`http://localhost:3001/api/auth/forgotPassword`, {email: email})
        return metaData.data
      } catch(err) {
        alert("Ups! Something went wrong...");
        new Error(err)
      }
  };
}

export const bookmarkCourse = id => {
  return async dispatch => {
    try{
      const resp = await axios.put(`http://localhost:3001/api/${id}/favorite`)
      dispatch({
        type: BOOKMARCOURSE,
        payload: resp.data.user
      })
    }catch(erro) {
      alert("Ups! Something went wrong...");
      new Error(err)
    }
  }
}
      
export const getLesson = (idCourse, idLesson) => {
  return async function(dispatch) {
    try {
                                  /*A LA ESPERA DE LA CREACION DE LA RUTA*/
      const metaData = await axios(`http://localhost:3001/api/cursos/${idCourse}`, idLesson);
      return metaData.data

    }catch(err) {
      alert("Algo no va pa");
      return err;
    }
  }
}
