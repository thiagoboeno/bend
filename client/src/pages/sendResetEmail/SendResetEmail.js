import { useState } from "react";
import { useHistory } from "react-router";
import axios from "../../api";

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/reset-password", { email: email });
      history.push('/login');      
    } catch (err) {}
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
            className="w-full h-10 pl-4 rounded-3xl bg-gray-100 outline-none"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            required
          />

          <button className="w-60 mt-12 py-2 px-4 bg-tiffany text-white font-semibold hover:bg-blue_green" type="submit">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;