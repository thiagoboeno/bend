import Avatar from "../avatar/Avatar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userReducer";

const AvatarDropdown = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    dispatch(logout());
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
          <span className="text-gray-700 block px-4 py-2 text-16 hover:bg-gray-200" onClick={handleLogout}>
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
}

export default AvatarDropdown;