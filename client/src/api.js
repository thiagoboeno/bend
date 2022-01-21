import axios from "axios";
import store from './redux/store';
import { logout } from "./redux/userReducer";

const { dispatch } = store;
const user = JSON.parse(localStorage.getItem('user'));
const token = user?.accessToken;

const axiosSetup = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { token: `Bearer ${token}` },
});

axiosSetup.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      dispatch(logout());
    }

    return Promise.reject(error);
 }
);

export default axiosSetup;