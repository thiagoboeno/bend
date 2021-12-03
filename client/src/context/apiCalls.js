import axios from "../api";
import { LoginStart, LoginSuccess, LoginFailure } from "./AuthActions"

export const loginCall = async (userCredential, dispatch) => {
  dispatch(LoginStart());
  
  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch(LoginSuccess(res.data));
  } catch (err) {
    dispatch(LoginFailure());
  }
};