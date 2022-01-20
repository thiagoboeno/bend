import Topbar from "../../components/topbar/Topbar";
import {
  Edit,
} from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UpdateUser } from "../../context/AuthActions";
import axios from "../../api";

const UpdateProfile = () => {
  const avatarFolder = process.env.REACT_APP_AVATAR_IMAGES_FOLDER;
  const coverFolder = process.env.REACT_APP_COVER_IMAGES_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [description, setDescription] = useState('');
  const [coverPicture, setCoverPicture] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${currentUser.username}`);
      setUser(res.data);
      setUsername(res.data.username);
      setDescription(res.data.desc);
    };

    fetchUser();
  }, [currentUser]);

  const coverImage = () => {
    if (coverPicture) {
      return URL.createObjectURL(coverPicture);
    } else if (user.coverPicture) {
      return coverFolder + user.coverPicture;
    } else {
      return coverFolder + 'default/noCover.jpg';
    }
  };

  const profileImage = () => {
    if (profilePicture) {
      return URL.createObjectURL(profilePicture);
    } else if (user.profilePicture) {
      return avatarFolder + user.profilePicture;
    } else {
      return avatarFolder + 'default/noAvatar.png';
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const userData = {
      userId: user._id,
      username: username,
      birthdate: birthdate,
      desc: description,
    };

    if (coverPicture) {    
      try {
        const data = new FormData();
        data.append('coverImage', coverPicture);

        const coverImage = await axios.post('/users/cover/upload', data);
        userData.coverPicture = coverImage.data;
      } catch (err) {}
    }

    if (profilePicture) {    
      try {
        const data = new FormData();
        data.append('profileImage', profilePicture);

        const profileImage = await axios.post('/users/avatar/upload', data);
        userData.profilePicture = profileImage.data;
      } catch (err) {}
    }

    try {
      await axios.put(`/users/${currentUser._id}`, userData);
      dispatch(UpdateUser(userData));
    } catch (err) {}
  };

  return (
    <main className="grid grid-rows-content">
      <Topbar />

      <div className="grid">
        <div className="flex flex-col">
          <div className="h-80 relative">
            <div className="relative flex justify-center items-center">
              <img
                className="w-full h-60 object-cover"
                src={coverImage()}
                alt={user.username}
              />

              <label htmlFor="cover-picture" className="bg-white w-full h-full absolute flex justify-center items-center opacity-0 hover:opacity-70 transition-opacity duration-700 cursor-pointer">
                <Edit className="text-gray-600 w-10 h-10" />
                
                <input
                  id="cover-picture"
                  className="hidden"
                  type="file"
                  accept=".png,.jpeg,.jpg, .gif"
                  onChange={(e) => setCoverPicture(e.target.files[0])}
                />
              </label>
            </div>

            <div className="relative flex justify-center items-center">
              <img
                className="absolute left-0 right-0 w-36 h-36 m-auto border-4 border-solid border-tiffany rounded-full object-cover"
                src={profileImage()}
                alt={user.username}
              />

              <label htmlFor="profile-picture" className="bg-tiffany w-36 h-36 absolute flex justify-center items-center opacity-0 hover:opacity-80 transition-opacity duration-700 rounded-full cursor-pointer">
                <Edit className="text-white w-10 h-10" />
                
                <input
                  id="profile-picture"
                  className="hidden"
                  type="file"
                  accept=".png,.jpeg,.jpg, .gif"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          <div className="container">
            <form className="bg-white max-w-screen-lg flex flex-col items-center mt-6 mx-auto" onSubmit={handleClick}>
              <input
                placeholder="Email"
                className="w-full h-10 mb-6 pl-4 rounded-3xl bg-gray-100 outline-none"
                value={user.email}
                disabled
              />
              
              <input
                placeholder="Username"
                className="w-full h-10 mb-6 pl-4 rounded-3xl bg-gray-100 outline-none"
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />

              <input
                placeholder="Birthdate"
                className="w-full h-10 mb-6 px-4 rounded-3xl bg-gray-100 outline-none"
                type="date"
                onChange={(e) => setBirthdate(e.target.value)}
                value={birthdate}
              />

              <textarea
                placeholder="Description"
                className="w-full min-h-200 max-h-200 mb-6 px-4 py-4 rounded-3xl bg-gray-100 outline-none"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />

              <button className="w-60 py-2 px-4 bg-mint text-white font-semibold hover:bg-green-300" type="submit">
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </ main>
  );
}

export default UpdateProfile;