// index reducers app
const initialState = {
  courses: [],
  filteredCurses: [],
  user: [],
  CurseDetail: {},
  theme: "dark",

};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    //Para obtener la lista completa de mi api y almacenarla en el estado
    case "GET_PROFILE":
      return {
        ...state,
        user: payload,
      };
    case "NEW_THEME":
      return {
        ...state,
        theme: payload,
      };
    case "GET_COURSES":
      return {
        ...state,
        courses: payload,
      };
    case "GET_CURSE":
      return {
        ...state,
        CurseDetail: payload,
      };
    case "GET_COURSEBYNAME":
      return {
        ...state,
        courses: payload,
      };
    default:
      return state;
  }
}
