// actions types
import {
  POST_NEW_USER,
  VALIDATE_USER,
  GET_COURSES,
  GET_COURSEBYNAME
  } from "../actions/actionsTypes/actionTypes";

// index reducers app
const initialState = {
  user: {},
  isLoger: false,
  showedCourses: [],
  courses: [],
  theme: "dark",
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //Para obtener la lista completa de mi api y almacenarla en el estado
    case VALIDATE_USER:
      return {
        ...state,
        user: payload.user,
        isLoger: payload.isLoger,
      };
    case POST_NEW_USER:
      return {
        ...state,
        user: payload
      }
    case 'NEW_THEME':
      return {
        ...state,
<<<<<<< HEAD
        theme: payload
      }
    case 'SET_COURSES':
=======
        theme: payload,
      };
    case GET_COURSES:
>>>>>>> 52774992a70edaacdf316ceeb4a452c0da0deae6
      return {
        ...state,
        courses: payload,
      };
    case GET_COURSEBYNAME:
      return {
        ...state,
        courses: payload
      }
      case 'SET_SHOWEDCOURSES':
        return {
          ...state,
          showedCourses: payload
        }
    default:
      return state
  }
}

export default rootReducer;
