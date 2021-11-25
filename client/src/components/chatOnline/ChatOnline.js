import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const avatarFolder = process.env.REACT_APP_AVATAR_IMAGES_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`/users/friends/${currentId}`);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((friend) => onlineUsers.includes(friend._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );

      setCurrentChat(res.data);
    } catch (err) {}
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((friend, index) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(friend)} key={index}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                friend?.profilePicture
                  ? avatarFolder + friend.profilePicture
                  : avatarFolder + "default/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          
          <span className="chatOnlineName">{friend?.username}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;