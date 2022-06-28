import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  setShowedCourses,
  setCourses,
  setAllUsers,
  setValidateUser,
  setShowedUsers,
  updateUser,
  setRanking,
  setAuthToken,
  setPaginateCourses,
  setPaginateUsers,
} from "../reducer/index";

export const addVotes = createAsyncThunk("/votes", async (obj) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${obj.token}`,
      },
    };
    const data = await axios.put(`/api/cursosprivate/votes`, obj.info, config);
    console.log(data);
  } catch (err) {
    console.log(err);
    new Error(err);
  }
});
// asynchronous actions

export const register = createAsyncThunk(
  "/auth/register",
  async (userData, thunkAPI) => {
    try {
      const metaData = await axios.post("/api/auth/register", userData);
      thunkAPI.dispatch(setValidateUser(metaData.data.user));
      return metaData.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const findCourse = createAsyncThunk("/cursos/detail", async (id) => {
  try {
    const resp = await axios.get(`/api/cursos/detail/${id}`);
    return resp.data;
  } catch (err) {
    console.log("se rompio");
  }
});

export const login = createAsyncThunk("/auth/login", async (post, thunkAPI) => {
  try {
    const metaData = await axios.post("/api/auth/login", post);
    thunkAPI.dispatch(setValidateUser(metaData.data.user));
    thunkAPI.dispatch(setAuthToken(metaData.data.token));
    return metaData.data;
  } catch (err) {
    return err.response.data;
  }
});

export const findUserByName = createAsyncThunk(
  "/usersprivate/username",
  async (obj, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${obj.token}`,
        },
      };
      let metaData = await axios.get(
        `/api/usersprivate/username?username=${obj.input}`,
        config
      );
      thunkAPI.dispatch(setShowedUsers(metaData.data));
    } catch (err) {
      alert("Ups! Something went wrong... FINDUSERBYNAME");
      return err.response.data;
    }
  }
);

export const editUsername = createAsyncThunk(
  "/:id/profile",
  async (obj, thunkAPI) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${obj.token}`,
      },
    };

    try {
      const metaData = await axios.put(
        `/api/usersprivate/${obj.id}/profile`,
        { username: obj.username },
        config
      );
      thunkAPI.dispatch(updateUser(metaData.data));
      return metaData.data;
    } catch (err) {
      alert("Ups! Something went wrong...EDITUSERNAME");
      new Error(err);
    }
  }
);

export const editPassword = createAsyncThunk(
  "/auth/forgotPassword",
  async (email) => {
    try {
      const metaData = await axios.put(`/api/auth/forgotPassword`, {
        email: email,
      });
      return metaData.data;
    } catch (err) {
      alert("Ups! Something went wrong...EDITPASSWORD");
      new Error(err);
    }
  }
);

export const getCourses = createAsyncThunk(
  "/api/cursos",
  async (obj, thunkAPI) => {
    try {
      const metaData = await axios.get(`/api/cursos?limit=8&page=${obj.page}`);
      thunkAPI.dispatch(setCourses(metaData.data.docs));
      thunkAPI.dispatch(setShowedCourses(metaData.data.docs));
      thunkAPI.dispatch(setPaginateCourses(metaData.data));
      return metaData.data;
    } catch (err) {
      console.log(err);
      alert("Ups! Something went wrong... GETCOURSES");
    }
  }
);

export const getCourseByName = createAsyncThunk(
  "/cursos/:name",
  async (name, thunkAPI) => {
    try {
      const metaData = await axios.get(`/api/cursos/${name}`);
      thunkAPI.dispatch(setShowedCourses(metaData.data.course));
      return metaData.data;
    } catch (err) {
      thunkAPI.dispatch(setShowedCourses([]));
      return err.response.data;
    }
  }
);

export const bookmarkCourse = createAsyncThunk(
  "/cursosprivate/favorite",
  async (obj, thunkAPI) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${obj.token}`,
        },
      };
      const resp = await axios.put(
        `/api/cursosprivate/favorite`,
        { idCurso: obj.id },
        config
      );
      console.log(resp);
      thunkAPI.dispatch(updateUser(resp.data.updateUser));
    } catch (err) {
      alert("Ups! Something went wrong ...BOOKMARKCOURSE");
      console.log(err);
    }
  }
);

export const unmarkfavorites = createAsyncThunk(
  "/cursosprivate/unfavorite",
  async (obj, thunkAPI) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${obj.token}`,
        },
      };

      const resp = await axios.put(
        `/api/cursosprivate/unfavorite`,
        { idCurso: obj.id },
        config
      );
      thunkAPI.dispatch(updateUser(resp.data.updateUser));
      console.log(resp);
    } catch (err) {
      alert("Ups! Something went wrong... UNMARKFAVORITE");
      console.log(err);
    }
  }
);
/*A LA ESPERA DE LA CREACION DE LA RUTA??????*/
export const getLesson = createAsyncThunk(
  "/:id/lesson",
  async (obj, thunkAPI) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${obj.token}`,
        },
      };
      const metaData = await axios.get(
        `/api/cursosprivate/${obj.id}/lesson`,
        config
      );
      console.log("asda", metaData);
      return metaData.data;
    } catch (err) {
      new Error(err);
      alert("Ups! Something went wrong... GETLESSON");
      console.log(err);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "/api/usersprivate",
  async (obj, thunkAPI) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${obj.token}`,
        },
      };
      const metaData = await axios(
        `/api/usersprivate/?limit=8&page=${obj.page}`,
        config
      );
      console.log(metaData.data);
      thunkAPI.dispatch(setAllUsers(metaData.data.users.docs));
      thunkAPI.dispatch(setShowedUsers(metaData.data.users.docs));
      thunkAPI.dispatch(setPaginateUsers(metaData.data.users));
    } catch (err) {
      console.log(err);
    }
  }
);

export const auhtGoogle = createAsyncThunk(
  "/auth/googlelogin",
  async (tokenId, thunkAPI) => {
    try {
      const metaData = await axios.post("/api/auth/googlelogin", { tokenId });
      thunkAPI.dispatch(setValidateUser(metaData.data.user));
      return metaData.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const getUserRank = createAsyncThunk(
  "position:userid",
  async (obj, thunkAPI) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${obj.token}`,
        },
      };
      const metaData = await axios.get(
        `/api/usersprivate/position/${obj.id}`,
        config
      );
      return metaData.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getRanking = createAsyncThunk(
  "/users/top",
  async (args, thunkAPI) => {
    try {
      const metaData = await axios.get("/api/users/topFive");
      thunkAPI.dispatch(setRanking(metaData.data.sorted));
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "/usersprivate/deleteuser",
  async (obj) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${obj.token}`,
        },
        data: {
          id: obj.userId,
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
  }
);

export const isAdminConverter = createAsyncThunk(
  "/usersprivate/isAdmin",
  async (obj) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${obj.token}`,
        },
      };

      const metaData = await axios.put(
        `/api/usersprivate/isAdmin`,
        { id: obj.userId, change: obj.boolean },
        config
      );
      console.log(metaData);
      return metaData.data;
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

export const isPremiumConverter = createAsyncThunk(
  "/usersprivate/isPremium",
  async (obj, thunkAPI) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${obj.token}`,
        },
      };
      const metaData = await axios.put(
        `/api/usersprivate/isPremium`,
        { hola: "" },
        config
      );
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  }
);

export const Banear = createAsyncThunk("/usersprivate/ban", async (obj) => {
  try {
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${obj.token}`,
      },
    };

    const metaData = await axios.post(
      `/api/usersprivate/ban`,
      { id: obj.userId, fecha: obj.date },
      config
    );

    return { successful: true, data: metaData };
  } catch (err) {
    return { successful: false, error: err };
  }
});

export const editImage = createAsyncThunk(
  "/editImage/profile",
  async (obj, thunkAPI) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${obj.token}`,
      },
    };

    try {
      const metaData = await axios.put(
        "/api/usersprivate/editImage/profile",
        { url: obj.url },
        config
      );
      console.log(obj.url);
      thunkAPI.dispatch(updateUser(metaData.data.updateUser));
      console.log("hola");
      return metaData.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  }
);
