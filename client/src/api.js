import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const token = user?.accessToken;

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { token: `Bearer ${token}` },
});