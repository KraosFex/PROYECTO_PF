import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {}, // anda
  isLogged: false, // anda
  topTen: [], //anda
  allUsers: [], //anda
  showedUsers: [], //anda
  courses: [], //anda
  showedCourses: [], //anda
  theme: "light", //anda
  arrowDirection: "left", //anda
  arrowUpDown: "down", //anda
  arrowCourse: "down", //anda
  authToken: "", //anda
  refresh: false,
  rankBorder: "",
  paginateCourses: {},
  paginateUsers: {},
  aleatoryString: "hola",
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
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
    setRankBorder: (state, action) => {
      state.rankBorder = action.payload;
    },
    setPaginateCourses: (state, action) => {
      state.paginateCourses = action.payload;
    },
    setPaginateUsers: (state, action) => {
      state.paginateUsers = action.payload;
    },
    setAleatoryString: (state, action) => {
      state.aleatoryString = action.payload;
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
  setRefresh,
  setRankBorder,
  setPaginateCourses,
  setPaginateUsers,
  setAleatoryString,
} = appSlice.actions;

export default appSlice.reducer;
