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
} from "../actions/actionsTypes/actionTypes";

// index reducers app
const initialState = {
  user: {},
  lesson:{},
  detail:{},
  isLogged: false,
  topTen: ["No hay usuarios"],
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
      var filtar = payload.courses
      if(filtar.length){ filtar = payload.courses.filter(e=> e.course)}
      var filtrar2 = payload.lessons
      if(filtrar2.length){filtrar2 = payload.lessons.sort((a, b) => a.lesson.num > b.lesson.num ? 1 : -1) }
      return {
        ...state,
        user: {...payload, courses: filtar, lessons: filtrar2},
        isLogged: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        isLogged: false,
      };
    case SET_UPDATEUSER:
      var filtar = payload.courses
      if(filtar.length){ filtar = payload.courses.filter(e=> e.course)}
      var filtrar2 = payload.lessons
      if(filtrar2.length){filtrar2 = payload.lessons.sort((a, b) => a.lesson.num > b.lesson.num ? 1 : -1) }
      return {
        ...state,
        user: {...payload, courses: filtar, lessons: filtrar2},
      };
    case SET_COURSES:
      return {
        ...state,
        courses: payload,
      };
    case SET_SHOWEDCOURSES:
      if(payload.length === 0){
        return {
          ...state,
          showedCourses: state.courses,
        };
      }
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
    case  "GET_DETAIL":
      return{
        ...state, detail:payload
      }
    case "GET_LESSON":
      return{
        ...state, lesson:payload
      }
    default:
      return state;
  }
};

export default rootReducer;
