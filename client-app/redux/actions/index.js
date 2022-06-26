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

export const logout = (dispatch) => {
  dispatch({ type: LOGOUT, });
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
// asynchronous actions

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
export const addVotes = function (id, info) {
  return async function () {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const data = await axios.put(`/api/cursosprivate/${id}/votes`, info, config);
      dispatch({ type: "GET_DETAIL",payload: data.curso})
    } catch (err) {
      new Error(err);
    }
  }
};

export const findCourse = (id) => {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`/api/cursos/data/${id}`);
      dispatch({ type: "GET_DETAIL", payload: resp.data });
    } catch (err) {
      new Error(err);
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
      dispatch(setValidateUser({ ...metaData.data.user, Last_Seen: new Date().toDateString().slice(4, 24) }));
      return metaData.data;
    } catch (err) {
      return err.response.data;
    }
  };
};


export const getCourseByName = (name) => {
  return async function (dispatch) {
    try {
      const metaData = await axios.get(
        `/api/cursos/${name}`
      );
      metaData.data.length ? dispatch(setShowedCourses(metaData.data)) : dispatch(setShowedCourses([]));
    } catch (err) {
      alert("Ups! Este curso no esta en la base de datos, prueba escribirlo nuevamente...");
      dispatch(setShowedCourses([]));


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
  return async function () {
    try {
      const metaData = await axios.put(
        `/api/auth/forgotPassword`,
        { email: email }
      );
      return metaData.data;
    } catch (err) {
      console.log(err.code)
      return { success: false, data: "Upp, algo salio mal, quizas el correo no existe en la base de datos, intenta nuevamente(" + err.code + ")" }
    }
  };
};

export const getCourses = () => {
  return async function (dispatch) {
    try {
      const metaData = await axios.get("/api/cursos");
      dispatch(setCourses(metaData.data.docs));
      dispatch(setShowedCourses(metaData.data.docs));
    } catch (err) {
      console.log(err);
      alert("Ups! Something went wrong...");
    }
  };
};

export const bookmarkCourse = (idUser, idCurso) => {
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
        { idUser, idCurso },
        config
      );
      dispatch(updateUser(resp.data.user));
    } catch (err) {
      console.log(err);
    }
  };
};

export const unmarkfavorites = (idUser, idCurso) => {
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
        { idUser, idCurso },
        config
      );
      dispatch(updateUser(resp.data.user));
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
      const metaData = await axios.get(`/api/cursosprivate/${idLesson}/lessons`,config);
      dispatch({type: "GET_LESSON",payload: metaData.data.lesson2[0]});
    } catch (err) {
      return err;
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
        `/api/usersprivate/all`,
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
      const metaData = await axios.post("/api/auth/googlelogin", { tokenId });
      dispatch(setValidateUser(metaData.data));
      return metaData.data;
    } catch (err) {
      return err.response.data;
    }
  };
};

export const getUserRank = (userId) => {
  return async function () {
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
      const metaData = await axios.get(
        "/api/users/topten"
      );
      dispatch(setRanking(metaData.data.sorted));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteUser = (userId) => {
  return async function () {
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
  return async function () {
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
  }
}


export const Banear = (userId, fecha) => {
  return async function () {
    try {

      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      };

      const metaData = await axios.post(`/api/usersprivate/ban`, { id: userId, fecha: fecha }, config);

      return { successful: true, data: metaData }
    } catch (err) {
      return { successful: false, error: err }
    }
  }
}
export const BanearDef = (userId, estado) => {
  return async function () {
    try {

      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      };

      const metaData = await axios.post(`/api/usersprivate/permaBan`, { id: userId, estado }, config);

      return { successful: true, data: metaData }
    } catch (err) {
      return { successful: false, error: err }
    }
  }
}

export const Create = (data, lessons) => {
  return async function () {
    try {
      await axios.post(`/api/cursosprivate/first/`, {body:data, lessons});
    } catch (err) {
      console.log(err)
    }
  }
}

export const CreateLesson = (idCurso, data) => {
  return async function (dispatch) {
    try {
      let info = await axios.put(`/api/cursosprivate/new/${idCurso}`, data);
      dispatch(setCourses(info))
    } catch (err) {
      console.log(err)
    }
  }
}
