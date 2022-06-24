// actions types
import {
  SET_VALIDATEUSER,
  SET_COURSES,
  SET_SHOWEDCOURSES,
  SET_THEME,
  LOGOUT,
  SET_UPDATEUSER,
  SET_ALLUSERS,
  SET_SHOWEDUSERS,
  SET_RANKING,
  SET_ARROW_UPDOWN,
  SET_ARROW_DIRECTION,
  SET_DETAIL
} from "../actions/actionsTypes/actionTypes";

// index reducers app
const initialState = {
  user: {},
  detail: {},
  isLogged: false,
  topTen: [],
  allUsers: [],
  showedUsers: [],
  courses: [],
  showedCourses: [],
  theme: "light",
  arrowDirection: "left",
  arrowUpDown: "down",
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //Para obtener la lista completa de mi api y almacenarla en el estado
    case SET_VALIDATEUSER:
      return {
        ...state,
        user: payload,
        isLogged: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        isLogged: false,
      };
    case SET_UPDATEUSER:
      return {
        ...state,
        user: payload,
      };
    case SET_COURSES:
      return {
        ...state,
        courses: payload,
      };
    case SET_SHOWEDCOURSES:
      return {
        ...state,
        showedCourses: payload,
      };
    case SET_ALLUSERS:
      return {
        ...state,
        allUsers: payload,
      };
    case SET_SHOWEDUSERS:
      return {
        ...state,
        showedUsers: payload,
      };
    case SET_THEME:
      return {
        ...state,
        theme: payload,
      };
    case SET_RANKING:
      return {
        ...state,
        topTen: payload,
      };
    case SET_ARROW_DIRECTION:
      return {
        ...state,
        arrowDirection: payload,
      };
    case SET_ARROW_UPDOWN:
      return {
        ...state,
        arrowUpDown: payload,
      };
    case SET_DETAIL:
      return {
        ...state,
        detail: payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
