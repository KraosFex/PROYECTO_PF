// index reducers app
const initialState = {
  Curses: [],
  showedCourses: [],
  user: [],
  theme: 'dark',
  courses: []
}

export default function rootReducer (state = initialState, { type, payload }) {
  switch (type) {
    // Para obtener la lista completa de mi api y almacenarla en el estado
    case 'GET_PROFILE':
      return {
        ...state,
        user: payload
      }
    case 'POST_NEW_USER':
      return {
        ...state,
        user: payload
      }
    case 'NEW_THEME':
      return {
        ...state,
        theme: payload
      }
    case 'SET_COURSES':
      return {
        ...state,
        courses: payload
      }
    case 'GET_COURSEBYNAME':
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
