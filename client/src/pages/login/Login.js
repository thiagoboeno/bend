import { useCallback, useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/register'), [history]);

  const handleClick = (e) => {
    e.preventDefault();

    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="bg-gradient-to-br from-fancy_pink to-blue_green flex items-center w-screen h-screen">
      <div className="container max-w-screen-2xl grid grid-cols-2 gap-4 items-center">
        <div className="flex flex-col">
          <h3 className="text-62 text-white text-bold mb-2 filter drop-shadow-2xl">Bend</h3>
          
          <span className="text-white text-24 filter drop-shadow-2xl">
            Connect with friends and the world around you on Bend.
          </span>
        </div>

        <form className="bg-white flex flex-col items-center py-16 px-8 shadow rounded-3xl" onSubmit={handleClick}>
          <input
            placeholder="Email"
            type="email"
            required
            ref={email}
            className="w-full h-10 mb-6 pl-4 rounded-3xl bg-gray-100 outline-none"
          />

          <input
            placeholder="Password"
            type="password"
            required
            minLength="6"
            ref={password}
            className="w-full h-10 pl-4 rounded-3xl bg-gray-100 outline-none"
          />

          <button className="w-60 mt-12 mb-4 py-2 px-4 bg-tiffany text-white font-semibold hover:bg-blue_green" type="submit" disabled={isFetching}>
            {isFetching ? (
              <CircularProgress color="white" size="20px" />
            ) : (
              "Log In"
            )}
          </button>

          <span className="text-16 text-black mb-4">Forgot Password?</span>
          
          <button className="w-60 py-2 px-4 bg-mint text-white font-semibold hover:bg-green-300" onClick={handleOnClick}>
            {isFetching ? (
              <CircularProgress color="white" size="20px" />
            ) : (
              "Create a New Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;