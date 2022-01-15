import Avatar from "../avatar/Avatar";
import axios from "../../api";
import { useEffect, useState } from "react";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  const friendId = conversation.members.find((member) => member !== currentUser._id);
  
  useEffect(() => {
    const getUser = async () => {
      const res = await axios(`/users/${friendId}`);
      setUser(res.data);
    };
    getUser();
  }, [friendId]);

  return (
    <div className="flex items-center p-3 border border-solid border-gray-300 rounded-lg cursor-pointer">
      { user && <Avatar user={user} showName /> }
    </div>
  );
}

export default Conversation;