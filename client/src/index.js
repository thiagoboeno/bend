import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from "./context/AuthContext";
import reportWebVitals from './reportWebVitals';

import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
