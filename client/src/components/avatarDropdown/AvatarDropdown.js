import Avatar from "../avatar/Avatar";
// import { Search, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Logout } from "../../context/AuthActions";

const AvatarDropdown = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const logout = () => {
    dispatch(Logout());
  };

  return (
    <div className="relative">
      <button type="submit" onClick={handleClick}>
        <Avatar user={user} noLink />
      </button>

      <ul className={`absolute right-0 mt-2 w-56 rounded-md shadow bg-white divide-y divide-gray-200 outline-none origin-top-right transform transition-transform duration-500 ${showDropdown ? 'scale-100' : 'scale-0'}`}>
        <li className="py-1">
          <Link className="flex flex-col text-gray-700 px-4 py-2 text-16 hover:bg-gray-200" to={`/profile/${user.username}`}>
            { user.username }
            
            <span className="text-12 text-gray-400">View Profile</span>
          </Link>
        </li>

        <li className="py-1">
           <Link className="text-gray-700 block px-4 py-2 text-16 hover:bg-gray-200" to="/profile/update">
            Update Profile
          </Link>
        </li>

        <li className="py-1">
          <span className="text-gray-700 block px-4 py-2 text-16 hover:bg-gray-200" onClick={logout}>
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
}

export default AvatarDropdown;