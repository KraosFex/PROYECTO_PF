// Store app
import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import reducerAll from "../actions";
import storage from "redux-persist/lib/storage";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const reducers = combineReducers({
  reducerCompleto: reducerAll,
});

const persistConfig = {
  key: "main-root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  applyMiddleware,
});
const Persistor = persistStore(store);

export { Persistor };
export default store;
