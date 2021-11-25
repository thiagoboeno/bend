import "./closeFriend.css";

const CloseFriend = ({user}) => {
  const avatarFolder = process.env.REACT_APP_AVATAR_IMAGES_FOLDER;
  
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={avatarFolder + user.profilePicture} alt="" />

      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}

export default CloseFriend;