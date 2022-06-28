import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store, { Persistor } from "./redux/store/Store";
import App from "./src/App";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";

axios.defaults.baseURL =
  import.meta.env.VITE_BACK_ROUTE || "http://localhost:3001/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={Persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
