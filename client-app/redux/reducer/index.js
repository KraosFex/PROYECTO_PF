
// index reducers app
const initialState = {
  Curses: [],
  filteredCurses: [],
  profile: [],
  CurseDetail: {},
  theme: "",
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    //Para obtener la lista completa de mi api y almacenarla en el estado
    case "GET_PROFILE":
      return {
        ...state,
        profile: payload,
      };
     case "GET_CURSE":
      return {
        ...state,
        CurseDetail: payload,
      };
    case "POST_NEW_USER":
      return {
        ...state,
        profile: payload,
      };
    case "NEW_THEME":
      return {
        ...state,
        theme: payload,
      };
    default:
      return state;
  }
}

