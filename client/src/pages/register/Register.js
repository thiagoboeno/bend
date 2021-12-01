import axios from "axios";
import { useCallback, useRef } from "react";
import { useHistory } from "react-router";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/login'), [history]);

  const handleClick = async (e) => {
    e.preventDefault();

    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {}
    }
  };

  return (
    <div className="bg-gradient-to-br from-fancy_pink to-mint flex items-center w-screen h-screen">
      <div className="container max-w-screen-2xl grid grid-cols-2 gap-4 items-center">
        <div className="flex flex-col">
          <h3 className="text-62 text-white text-bold mb-2 filter drop-shadow-2xl">Bend</h3>
          
          <span className="text-white text-24 filter drop-shadow-2xl">
            Connect with friends and the world around you on Bend.
          </span>
        </div>

        <form className="bg-white flex flex-col items-center py-16 px-8 shadow rounded-3xl" onSubmit={handleClick}>
          <input
            placeholder="Username"
            required
            ref={username}
            className="w-full h-10 mb-6 pl-4 rounded-3xl bg-gray-100 outline-none"
          />

          <input
            placeholder="Email"
            required
            ref={email}
            className="w-full h-10 mb-6 pl-4 rounded-3xl bg-gray-100 outline-none"
            type="email"
          />

          <input
            placeholder="Password"
            required
            ref={password}
            className="w-full h-10 mb-6 pl-4 rounded-3xl bg-gray-100 outline-none"
            type="password"
            minLength="6"
          />

          <input
            placeholder="Password Again"
            required
            ref={passwordAgain}
            className="w-full h-10 pl-4 rounded-3xl bg-gray-100 outline-none"
            type="password"
          />

          <button className="w-60 mt-12 mb-4 py-2 px-4 bg-tiffany text-white font-semibold hover:bg-blue_green" type="submit">
            Sign Up
          </button>

          <button className="w-60 py-2 px-4 bg-mint text-white font-semibold hover:bg-green-300" onClick={handleOnClick}>
            Login into Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;