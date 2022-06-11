// Store app 
import { legacy_createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

export default store
