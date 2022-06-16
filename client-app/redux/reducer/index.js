// actions types
import {
  SET_VALIDATEUSER,
  SET_COURSES,
  GET_COURSEBYNAME,
  SET_SHOWEDCOURSES,
  SET_THEME,
  LOGOUT,
  SET_UPDATEUSER
  } from "../actions/actionsTypes/actionTypes";

// index reducers app
const initialState = {
  user: {},
  isLogged: false,
  showedCourses: [],
  courses: [],
  theme: "light",
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
    case SET_THEME:
      return {
        ...state,
        theme: payload
      }
    case SET_COURSES:
      return {
        ...state,
        courses: payload,
      };
      case SET_SHOWEDCOURSES:
        return {
          ...state,
          showedCourses: payload
        }
    case LOGOUT:
      return{
        ...state,
        user: {},
        isLogged: false
      }
    case SET_UPDATEUSER:
      return{
        ...state,
        user: payload
      }
    default:
      return state
  }
}

export default rootReducer;
