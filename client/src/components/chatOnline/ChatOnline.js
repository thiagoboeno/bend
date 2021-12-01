import Avatar from "../avatar/Avatar";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  
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
    <div className="h-full">
      { friends.map((friend, index) => (
        <div className="flex flex-col mt-5" onClick={() => handleClick(friend)} key={index}>
          <Avatar user={friend} showName status={onlineFriends.some((user) => user._id === friend._id) ? "online" : "offline"} />
        </div>
      )) }
    </div>
  );
}

export default ChatOnline;