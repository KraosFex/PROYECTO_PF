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
  return {
    type: LOGOUT,
  };
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

export const addVotes = (info) => {
  return async function (dispatch) {
    try {

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        }
      }
      const metaData = await axios.put(`/api/cursosprivate/votes`, info, config);
    } catch (err) {
      console.log(err)
    }
  }
};

export const register = (userData) => {
  return async function (dispatch) {
    try {
      const metaData = await axios.post(
        "/api/auth/register",
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
        `/api/cursos/detail/${id}`
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
        "/api/auth/login",
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
        `/api/usersprivate/username?username=${username}`,
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
        `/api/usersprivate/${id}/profile`,
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
        `/api/auth/forgotPassword`,
        { email: email }
      );
      return metaData.data;
    } catch (err) {
      alert("Ups! Something went wrong...");
      new Error(err);
    }
  };
};

export const getCourses = (page) => {
  return async function (dispatch) {
    try {
      const metaData = await axios.get(`/api/cursos/?limit=8&page=${page}`);
      dispatch(setCourses(metaData.data.docs));
      dispatch(setShowedCourses(metaData.data.docs));
      return metaData.data
    } catch (err) {
      alert("Ups! Something went wrong...");
    }
  };
};

export const getCourseByName = (name) => {
  return async function (dispatch) {
    try {
      const metaData = await axios.get(
        `/api/cursos/${name}`
      );
      dispatch(setShowedCourses(metaData.data.course));
      return metaData.data
    } catch (err) {
      dispatch(setShowedCourses([]));
      return err.response.data
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
        `/api/cursosprivate/favorite`,
        { idCurso: id },
        config
      );
      dispatch(updateUser(resp.data.updateUser));
    } catch (err) {
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
        `/api/cursosprivate/unfavorite`,
        { idCurso: id },
        config
      );
      dispatch(updateUser(resp.data.updateUser));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getLesson = (idLesson) => {
  return async function (dispatch) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const metaData = await axios.get(
        `/api/cursosprivate/${idLesson}/lesson`,
        config
      );
      return metaData.data;
    } catch (err) {
      new Error(err);
      alert("Ups! Something went wrong...");
    }
  };
};

export const getAllUsers = (page) => {
  return async function (dispatch) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const metaData = await axios(
        `/api/usersprivate/?limit=8&page=${page}`,
        config
      );
      dispatch(setAllUsers(metaData.data.users.docs));
      dispatch(setShowedUsers(metaData.data.users.docs));
      return metaData.data
    } catch (err) {
      return err.response.data;
    }
  };
};

export const auhtGoogle = (tokenId) => {
  return async function (dispatch) {
    try {
      const metaData = await axios.post(
        "/api/auth/googlelogin",
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
        `/api/usersprivate/position/${userId}`,
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
      const metaData = await axios.get("/api/users/topFive");
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
        `/api/usersprivate/deleteUser`,
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
        `/api/usersprivate/isAdmin`,
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

export const isPremiumConverter = () => {
  return async function (dispatch) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      const metaData = await axios.put(
        `/api/usersprivate/isPremium`,
        config
      );
      dispatch(updateUser(metaData.data.updateUser))
      return metaData.data;
    } catch (err) {
      return err.response.data
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
        `/api/usersprivate/ban`,
        { id: userId, fecha: fecha },
        config
      );

      return { successful: true, data: metaData };
    } catch (err) {
      return { successful: false, error: err };
    }
  };
};
