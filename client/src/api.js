import axios from "axios";
import store from './redux/store';
import { logout } from "./redux/userReducer";

const { dispatch } = store;
const token = localStorage.getItem('persist:token');

const axiosSetup = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { token: `Bearer ${token}` },
});

axiosSetup.interceptors.response.use(
  response => response,
  error => {
    switch (error.response.status) {
      case 401:
      case 403:
        
        dispatch(logout());
        localStorage.removeItem('persist:token');
        break;
    
      default:
        break;
    }

    return Promise.reject(error);
 }
);

export default axiosSetup;