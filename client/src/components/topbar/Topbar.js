import Avatar from "../avatar/Avatar";
import { Search, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white border-mint border-b-4 border-solid flex items-center justify-between sticky top-0 z-header">
      <div className="container grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <Link to="/">
            <span className="ml-5 text-24 font-bold text-mint cursor-pointer">Bend</span>
          </Link>
        </div>

        <div className="col-span-6">
          <div className="h-10 mx-4 relative">
            <Search className="absolute top-2 left-3 text-22 text-gray-500" />
            
            <input
              placeholder="Search for friend, post or video"
              className="w-full h-full pl-10 rounded-3xl bg-gray-100 outline-none"
            />
          </div>
        </div>

        <div className="col-span-3 grid grid-cols-12 gap-4">
          <div className="col-start-7 col-span-4 flex items-center justify-self-end">
            <div className="flex align-items justify-center mr-6">
              <Link to="/messenger">
                <Chat className="fill-current text-22 text-gray-500" />
              </Link>
              
              {/* <span className="topbarIconBadge">2</span> */}
            </div>

            <div className="flex align-items justify-center">
              <Notifications className="fill-current text-26 text-gray-500" />

              {/* <span className="topbarIconBadge">1</span> */}
            </div>
          </div>

          <div className="col-span-2 justify-self-end">
            <Avatar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;