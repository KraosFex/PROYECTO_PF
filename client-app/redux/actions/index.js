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
  SET_SHOWEDUSERS,
  SET_RANKING,
  SET_ARROW_DIRECTION,
  SET_ARROW_UPDOWN,
  SET_ARROW_COURSE,
} from "./actionsTypes/actionTypes";

// synchronous actions

export const themeSwitcher = (theme) => {
  return {
    type: SET_THEME,
    payload: theme,
  };
};

export const setShowedCourses = (courses) => {
  return {
    type: SET_SHOWEDCOURSES,
    payload: courses,
  };
};

export const setCourses = (courses) => {
  return {
    type: SET_COURSES,
    payload: courses,
  };
};

export const setShowedUsers = (users) => {
  return {
    type: SET_SHOWEDUSERS,
    payload: users,
  };
};

export const setAllUsers = (users) => {
  return {
    type: SET_ALLUSERS,
    payload: users,
  };
};

export const setValidateUser = (userObject) => {
  return {
    type: SET_VALIDATEUSER,
    payload: userObject,
  };
};

export const updateUser = (userObject) => {
  return {
    type: SET_UPDATEUSER,
    payload: userObject,
  };
};

export const logout = () => {
  console.log("hola");
  return {
    type: LOGOUT,
    payload: {},
  };
};

export const addVotes = async function (id, info) {
  try {
    const data = await axios.put(
      `http://localhost:3001/api/cursosprivate/${id}/votes`,
      info
    );
  } catch (err) {
    new Error(err);
  }
};

export const setRanking = (ranking) => {
  return {
    type: SET_RANKING,
    payload: ranking,
  };
};

export const setArrowDirection = (arrow) => {
  return {
    type: SET_ARROW_DIRECTION,
    payload: arrow,
  };
};

export const setArrowUpDown = (arrowUpDown) => {
  return {
    type: SET_ARROW_UPDOWN,
    payload: arrowUpDown,
  };
};

export const setArrowCourse = (arrowCourse) => {
  return {
    type: SET_ARROW_COURSE,
    payload: arrowCourse,
  };
};
// asynchronous actions

export const register = (userData) => {
  return async function (dispatch) {
    try {
      const metaData = await axios.post(
        "http://localhost:3001/api/auth/register",
        userData
      );
      dispatch(setValidateUser(metaData.data.user));
      return metaData.data;
    } catch (err) {
      return err.response.data;
    }
  };
};

export const findCourse = (id) => {
  return async function (dispatch) {
    try {
      const resp = await axios.get(
        `http://localhost:3001/api/cursos/detail/${id}`
      );
      return resp.data;
    } catch (err) {
      console.log("se rompio");
    }
  };
};

export const login = (post) => {
  return async function (dispatch) {
    try {
      const metaData = await axios.post(
        "http://localhost:3001/api/auth/login",
        post
      );
      dispatch(setValidateUser(metaData.data.user));
      return metaData.data;
    } catch (err) {
      return err.response.data;
    }
  };
};

export const findUserByName = (username) => {
  return async function (dispatch) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      let metaData = await axios.get(
        `http://localhost:3001/api/usersprivate/username?username=${username}`,
        config
      );
      dispatch(setShowedUsers(metaData.data));
    } catch (err) {
      alert("Ups! Something went wrong...");
    }
  };
};

export const editUsername = (username, id) => {
  return async function (dispatch) {
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      const metaData = await axios.put(
        `http://localhost:3001/api/usersprivate/${id}/profile`,
        { username: username },
        config
      );
      dispatch(updateUser(metaData.data));
      return metaData.data;
    } catch (err) {
      alert("Ups! Something went wrong...");
      new Error(err);
    }
  };
};

export const editPassword = (email) => {
  return async function (dispatch) {
    try {
      const metaData = await axios.put(
        `http://localhost:3001/api/auth/forgotPassword`,
        { email: email }
      );
      return metaData.data;
    } catch (err) {
      alert("Ups! Something went wrong...");
      new Error(err);
    }
  };
};

export const getCourses = () => {
  return async function (dispatch) {
    try {
      const metaData = await axios.get("http://localhost:3001/api/cursos");
      dispatch(setCourses(metaData.data.docs));
      dispatch(setShowedCourses(metaData.data.docs));
    } catch (err) {
      alert("Ups! Something went wrong...");
    }
  };
};

export const getCourseByName = (name) => {
  return async function (dispatch) {
    try {
      const metaData = await axios.get(
        `http://localhost:3001/api/cursos/${name}`
      );
      dispatch(setShowedCourses(metaData.data));
    } catch (err) {
      new Error(err);
      alert("Ups! Something went wrong...");
    }
  };
};

export const bookmarkCourse = (id) => {
  return async function (dispatch) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      const resp = await axios.put(
        `http://localhost:3001/api/cursosprivate/favorite`,
        { idCurso: id },
        config
      );
      dispatch(updateUser(resp.data.user));
    } catch (err) {
      alert("Ups! Something went wrong...");
      console.log(err);
    }
  };
};

export const unmarkfavorites = (id) => {
  return async function (dispatch) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      const resp = await axios.put(
        `http://localhost:3001/api/cursosprivate/unfavorite`,
        { idCurso: id },
        config
      );
      dispatch(updateUser(resp.data.user));
    } catch (err) {
      alert("Ups! Something went wrong...");
      console.log(err);
    }
  };
};

/*A LA ESPERA DE LA CREACION DE LA RUTA??????*/
export const getLesson = (id) => {
  return async function (dispatch) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const metaData = await axios.get(
        `http://localhost:3001/api/cursosprivate/${id}/lesson`,
        config
      );
      return metaData.data;
    } catch (err) {
      new Error(err);
      alert("Ups! Something went wrong...");
    }
  };
};

export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const metaData = await axios(
        `http://localhost:3001/api/usersprivate/`,
        config
      );
      dispatch(setAllUsers(metaData.data.users.docs));
      dispatch(setShowedUsers(metaData.data.users.docs));
    } catch (err) {
      return err.response.data;
    }
  };
};

export const auhtGoogle = (tokenId) => {
  return async function (dispatch) {
    try {
      const metaData = await axios.post(
        "http://localhost:3001/api/auth/googlelogin",
        { tokenId }
      );
      dispatch(setValidateUser(metaData.data.user));
      return metaData.data;
    } catch (err) {
      return err.response.data;
    }
  };
};

export const getUserRank = (userId) => {
  return async function (dispatch) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const metaData = await axios.get(
        `http://localhost:3001/api/usersprivate/position/${userId}`,
        config
      );
      return metaData.data;
    } catch (err) {
      return err.response.data;
    }
  };
};

export const getRanking = () => {
  return async function (dispatch) {
    try {
      const metaData = await axios.get(
        "http://localhost:3001/api/users/topten"
      );
      dispatch(setRanking(metaData.data.sorted));
    } catch (err) {
      console.log(err.response.data.info);
    }
  };
};

export const deleteUser = (userId) => {
  return async function (dispatch) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        data: {
          id: userId,
        },
      };

      const metaData = await axios.delete(
        `http://localhost:3001/api/usersprivate/deleteUser`,
        config
      );
      console.log(metaData.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const isAdminConverter = (userId, boolean) => {
  return async function (dispatch) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      const metaData = await axios.put(
        `http://localhost:3001/api/usersprivate/isAdmin`,
        { id: userId, change: boolean },
        config
      );
      console.log(metaData);
      return metaData.data;
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const Banear = (userId, fecha) => {
  return async function () {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      const metaData = await axios.post(
        `http://localhost:3001/api/usersprivate/ban`,
        { id: userId, fecha: fecha },
        config
      );

      return { successful: true, data: metaData };
    } catch (err) {
      return { successful: false, error: err };
    }
  };
};
