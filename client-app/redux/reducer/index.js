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
  isLoger: true,
  showCurses: [],
  filteredCurses: [],
  theme: "dark",
};

export default function rootReducer (state = initialState, { type, payload }) {
  switch (type) {
    //Para obtener la lista completa de mi api y almacenarla en el estado
    case VALIDATE_USER:
      return {
        ...state,
        user: payload,
      };
    case POST_NEW_USER:
      return {
        ...state,
        user: payload
      }
    case 'NEW_THEME':
      return {
        ...state,
        theme: payload,
      };
    case GET_COURSES:
      return {
        ...state,
        courses: payload,
      };
    case GET_COURSEBYNAME:
      return {
        ...state,
        courses: payload
      }
    default:
      return state
  }
}
