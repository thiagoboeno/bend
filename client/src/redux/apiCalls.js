import axios from "../api";
import { loginStart, loginSuccess, loginFailure } from "./userReducer";

export const loginCall = async (dispatch, userCredential) => {
  dispatch(loginStart());
  
  try {
    const res = await axios.post("/auth/login", userCredential);
    localStorage.setItem('persist:token', res.data.accessToken);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};