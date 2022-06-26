import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store/Store'
import App from './src/App'
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </BrowserRouter>
    </Provider>
)
