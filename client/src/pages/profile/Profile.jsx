import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "../../api";
import { useParams } from "react-router";

const Profile = () => {
  const avatarFolder = process.env.REACT_APP_AVATAR_IMAGES_FOLDER;
  const coverFolder = process.env.REACT_APP_COVER_IMAGES_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${username}`);
      setUser(res.data);
    };

    fetchUser();

  }, [username]);

  const coverImage = () => {
    if (user.coverPicture) {
      return coverFolder + user.coverPicture;
    } else {
      return coverFolder + 'default/noCover.jpg';
    }
  };

  const profileImage = () => {
    if (user.profilePicture) {
      return avatarFolder + user.profilePicture;
    } else {
      return avatarFolder + 'default/noAvatar.png';
    }
  };

  return (
    <main className="grid grid-rows-content">
      <Topbar />

      <div className="flex flex-col">
        <div>
          <div className="h-80 relative">
            <img
              className="w-full h-60 object-cover"
              src={coverImage()}
              alt={user.username}
            />

            <img
              className="absolute top-40 left-0 right-0 w-36 h-36 m-auto border-4 border-solid border-tiffany rounded-full object-cover"
              src={profileImage()}
              alt=""
            />
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-24">{user.username}</h4>
            
            <span className="font-light">{user.desc}</span>
          </div>
        </div>

        <div className="container max-w-screen-xl grid grid-cols-profile-content mt-8">
          <Feed username={username} />
          
          <Rightbar user={user} />
        </div>
      </div>
    </ main>
  );
}

export default Profile;