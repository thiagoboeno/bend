import "./rightbar.css";
import Avatar from "../avatar/Avatar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Rightbar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  useEffect(() => {
    const getFriends = async () => {
      const friendList = await axios.get(`/users/friends/${user?._id || currentUser._id}`);
      setFriends(friendList.data);
    };

    getFriends();
  }, [user, currentUser]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });

        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });

        dispatch({ type: "FOLLOW", payload: user._id });
      }

      setFollowed(!followed);
    } catch (err) {}
  };

  return (
    <div className="border-l-2 border-solid border-gray-100">
      <div className="p-5">
        { user && user.username !== currentUser.username && (
          <button className="mt-7 mb-3 py-2 px-4 bg-gradient-to-r from-mint to-blue_green text-white font-semibold hover:from-blue_green hover:to-fancy_pink" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
          </button>
        ) }

        <h4 className="text-20 font-bold mb-4">Friends</h4>

        { friends.map((friend, index) => (
          <div className="mb-4">
            <Avatar
              user={friend}
              key={index}
              showName
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rightbar;