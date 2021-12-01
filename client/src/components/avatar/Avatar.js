import { Link } from "react-router-dom";

const Avatar = ({user, status, showName}) => {
  const avatarFolder = process.env.REACT_APP_AVATAR_IMAGES_FOLDER;
  
  return (
    <Link className="relative flex items-center" to={`/profile/${user.username}`}>
      <img
        src={
          user.profilePicture
            ? avatarFolder + user.profilePicture
            : avatarFolder + "default/noAvatar.png"
        }
        className="w-10 h-10 rounded-full shadow cursor-pointer object-cover"
        alt={user.username}
      />

      { status && (
        <div className="absolute bottom-0 -left-1 w-4 h-4 border-2 border-solid border-white rounded-full">
          <span className={`${status === "online" ? "bg-green-500" : "bg-red-500"} absolute w-4 h-4 rounded-full animate-ping-slow duration-2000 opacity-75`} />

          <span className={`${status === "online" ? "bg-green-500" : "bg-red-500"} block w-4 h-4 rounded-full`} />
        </div>
      )}

      { showName && (
        <span className="ml-3">{user.username}</span>
      ) }
    </Link>
  );
}

export default Avatar;