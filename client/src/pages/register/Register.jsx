import axios from "../../api";
import { useCallback, useState } from "react";
import { useHistory } from "react-router";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/login'), [history]);

  const handleClick = async (e) => {
    e.preventDefault();

    if (password !== passwordAgain) {
      alert("Passwords don't match!");
    } else {
      const user = {
        username: username,
        email: email,
        password: password,
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
            className="w-full h-10 mb-6 pl-4 rounded-3xl bg-gray-100 outline-none"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="w-full h-10 mb-6 pl-4 rounded-3xl bg-gray-100 outline-none"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full h-10 mb-6 pl-4 rounded-3xl bg-gray-100 outline-none"
            placeholder="Password"
            type="password"
            minLength="6"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="w-full h-10 pl-4 rounded-3xl bg-gray-100 outline-none"
            placeholder="Password Again"
            type="password"
            required
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
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