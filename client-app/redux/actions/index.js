import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {}, // anda
  isLogged: false, // anda
  topTen: [],
  allUsers: [],
  showedUsers: [],
  courses: [],
  showedCourses: [],
  theme: "light", //anda
  arrowDirection: "left", //anda
  arrowUpDown: "down", //anda
  arrowCourse: "down", //anda
  authToken: "", //anda
};

export const appSlice = createSlice({
  name: "reducerAll",
  initialState,
  reducers: {
    themeSwitcher: (state, action) => {
      state.theme = action.payload;
    },
    setShowedCourses: (state, action) => {
      state.showedCourses = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setValidateUser: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
    },
    setShowedUsers: (state, action) => {
      state.showedUsers = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = {};
      state.isLogged = false;
    },
    setRanking: (state, action) => {
      state.topTen = action.payload;
    },
    setArrowUpDown: (state, action) => {
      state.arrowUpDown = action.payload;
    },
    setArrowDirection: (state, action) => {
      state.arrowDirection = action.payload;
    },
    setArrowCourse: (state, action) => {
      state.arrowCourse = action.payload;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
  },
});

export const {
  themeSwitcher,
  setShowedCourses,
  setCourses,
  setAllUsers,
  setValidateUser,
  setShowedUsers,
  updateUser,
  logout,
  setRanking,
  setArrowUpDown,
  setArrowDirection,
  setArrowCourse,
  setAuthToken,
} = appSlice.actions;

export default appSlice.reducer;

export const addVotes = createAsyncThunk("/votes", async (obj) => {
  try {
    console.log(obj);
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${obj.token}`,
      },
    };
    const data = await axios.put(
      `http://localhost:3001/api/cursosprivate/votes`,
      obj.info,
      config
    );
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
      const metaData = await axios.post(
        "http://localhost:3001/api/auth/register",
        userData
      );
      thunkAPI.dispatch(setValidateUser(metaData.data.user));
      return metaData.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const findCourse = createAsyncThunk("/cursos/detail", async (id) => {
  try {
    const resp = await axios.get(
      `http://localhost:3001/api/cursos/detail/${id}`
    );
    return resp.data;
  } catch (err) {
    console.log("se rompio");
  }
});

export const login = createAsyncThunk("/auth/login", async (post, thunkAPI) => {
  try {
    const metaData = await axios.post(
      "http://localhost:3001/api/auth/login",
      post
    );
    thunkAPI.dispatch(setValidateUser(metaData.data.user));
    thunkAPI.dispatch(setAuthToken(metaData.data.token));
    return metaData.data;
  } catch (err) {
    console.log("error");
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
        `http://localhost:3001/api/usersprivate/username?username=${obj.input}`,
        config
      );
      thunkAPI.dispatch(setShowedUsers(metaData.data));
    } catch (err) {
      alert("Ups! Something went wrong...");
      console.log(err);
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
        `http://localhost:3001/api/usersprivate/${obj.id}/profile`,
        { username: obj.username },
        config
      );
      thunkAPI.dispatch(updateUser(metaData.data));
      return metaData.data;
    } catch (err) {
      alert("Ups! Something went wrong...");
      new Error(err);
    }
  }
);

export const editPassword = createAsyncThunk(
  "/auth/forgotPassword",
  async (email) => {
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
  }
);

export const getCourses = createAsyncThunk(
  "/api/cursos",
  async (args, thunkAPI) => {
    try {
      const metaData = await axios.get("http://localhost:3001/api/cursos");
      thunkAPI.dispatch(setCourses(metaData.data.docs));
      thunkAPI.dispatch(setShowedCourses(metaData.data.docs));
    } catch (err) {
      alert("Ups! Something went wrong...");
    }
  }
);

export const getCourseByName = createAsyncThunk(
  "/cursos/:name",
  async (name, thunkAPI) => {
    try {
      const metaData = await axios.get(
        `http://localhost:3001/api/cursos/${name}`
      );
      console.log(metaData);
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
        `http://localhost:3001/api/cursosprivate/favorite`,
        { idCurso: obj.id },
        config
      );
      console.log(resp);
      thunkAPI.dispatch(updateUser(resp.data.updateUser));
    } catch (err) {
      alert("Ups! Something went wrong...");
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
        `http://localhost:3001/api/cursosprivate/unfavorite`,
        { idCurso: obj.id },
        config
      );
      thunkAPI.dispatch(updateUser(resp.data.updateUser));
      console.log(resp);
    } catch (err) {
      alert("Ups! Something went wrong...");
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
        `http://localhost:3001/api/cursosprivate/${obj.id}/lesson`,
        config
      );
      console.log("asda", metaData);
      return metaData.data;
    } catch (err) {
      new Error(err);
      alert("Ups! Something went wrong...");
      console.log(err);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "/api/usersprivate",
  async (token, thunkAPI) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const metaData = await axios(
        `http://localhost:3001/api/usersprivate/`,
        config
      );
      thunkAPI.dispatch(setAllUsers(metaData.data.users.docs));
      thunkAPI.dispatch(setShowedUsers(metaData.data.users.docs));
    } catch (err) {
      console.log(err);
    }
  }
);

export const auhtGoogle = createAsyncThunk(
  "/auth/googlelogin",
  async (tokenId, thunkAPI) => {
    try {
      const metaData = await axios.post(
        "http://localhost:3001/api/auth/googlelogin",
        { tokenId }
      );
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
        `http://localhost:3001/api/usersprivate/position/${obj.id}`,
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
      const metaData = await axios.get(
        "http://localhost:3001/api/users/topFive"
      );
      thunkAPI.dispatch(setRanking(metaData.data.sorted));
      console.log(metaData.data.sorted);
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
        `http://localhost:3001/api/usersprivate/deleteUser`,
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
        `http://localhost:3001/api/usersprivate/isAdmin`,
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

export const Banear = createAsyncThunk("/usersprivate/ban", async (obj) => {
  try {
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${obj.token}`,
      },
    };

    const metaData = await axios.post(
      `http://localhost:3001/api/usersprivate/ban`,
      { id: obj.userId, fecha: obj.date },
      config
    );

    return { successful: true, data: metaData };
  } catch (err) {
    return { successful: false, error: err };
  }
});
