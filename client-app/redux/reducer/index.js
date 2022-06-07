// index reducers app 
const initialState = {
    Curses: [],
    filteredCurses: [],
    profile:[],
  };
  
  
  export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
      //Para obtener la lista completa de mi api y almacenarla en el estado
      case "GET_PROFILE":
        return {
          ...state,
          profile: payload,
        };
      case "POST_NEW_USER":
        return{
          ...state,
          profile:payload
        }
      default:
        return state;
    }
  }