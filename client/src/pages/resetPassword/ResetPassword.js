import { useState } from "react";
import { useParams, useHistory } from "react-router";
import axios from "../../api";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userId = useParams().userId;
  const token = useParams().token;
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (password === confirmPassword) {  
        await axios.post(`/reset-password/${userId}/${token}`, { password: password });
        history.push('/login');      
      } else {}
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
            placeholder="Password"
            type="password"
            className="w-full h-10 pl-4 mb-4 rounded-3xl bg-gray-100 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            placeholder="Confirm Password"
            type="password"
            className="w-full h-10 pl-4 rounded-3xl bg-gray-100 outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button className="w-60 mt-12 mb-4 py-2 px-4 bg-tiffany text-white font-semibold hover:bg-blue_green" type="submit">
            Send reset link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;