import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "../../api";
import { useParams } from "react-router";

const Profile = () => {
  const avatarFolder = process.env.REACT_APP_AVATAR_IMAGES_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${username}`);
      setUser(res.data);
    };

    fetchUser();

  }, [username]);

  return (
    <main className="grid grid-rows-content">
      <Topbar />

      <div className="grid grid-cols-layout-profile">
        <Sidebar />

        <div className="flex flex-col">
          <div>
            <div className="h-80 relative">
              <img
                className="w-full h-60 object-cover"
                src={
                  user.coverPicture
                    ? avatarFolder + user.coverPicture
                    : avatarFolder + "default/noCover.jpg"
                }
                alt={user.username}
              />

              <img
                className="absolute top-40 left-0 right-0 w-36 h-36 m-auto border-4 border-solid border-mint rounded-full object-cover"
                src={
                  user.profilePicture
                    ? avatarFolder + user.profilePicture
                    : avatarFolder + "default/noAvatar.png"
                }
                alt=""
              />
            </div>

            <div className="flex flex-col items-center">
              <h4 className="text-24">{user.username}</h4>
              
              <span className="font-light">{user.desc}</span>
            </div>
          </div>

          <div className="grid grid-cols-profile-content mt-8">
            <Feed username={username} />
            
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </ main>
  );
}

export default Profile;