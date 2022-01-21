import axios from "../api";
import { loginStart, loginSuccess, loginFailure } from "./userReducer";

export const loginCall = async (dispatch, userCredential) => {
  dispatch(loginStart());
  
  try {
    const res = await axios.post("/auth/login", userCredential);
    localStorage.setItem('user', JSON.stringify(res.data))
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};