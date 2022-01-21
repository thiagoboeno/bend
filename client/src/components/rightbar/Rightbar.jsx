import Avatar from "../avatar/Avatar";
import { useEffect, useState } from "react";
import axios from "../../api";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../../redux/userReducer";

const Rightbar = ({ user }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  
  const [friends, setFriends] = useState([]);
  const [follower, setFollower] = useState(false);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const getFriends = async () => {
      const friendList = await axios.get(`/users/friends/${user?._id || currentUser._id}`);
      setFriends(friendList.data);
    };

    getFriends();
  }, [user, currentUser]);
  
  useEffect(() => {
    const getFollower = async () => {
      setFollower(currentUser.followings.includes(user?._id));
    };
    
    getFollower();
  }, [user, currentUser]);
  
  useEffect(() => {
    const getFollowed = async () => {
      setFollowed(user?.followings?.includes(currentUser._id));
    };

    getFollowed();
  }, [user, currentUser]);

  const followText = () => {
    if (followed) return 'Follow Back';
    else if (follower) return 'Unfollow';
    else return 'Follow';
  };

  const handleClick = async () => {
    try {
      if (follower) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });

        dispatch(unfollow(user._id));
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });

        dispatch(follow(user._id));
      }

      setFollower(!follower);
    } catch (err) {}
  };

  return (
    <div className="border-l-2 border-solid border-gray-100">
      <div className="p-5">
        { user && user.username !== currentUser.username && (
          <button className="mt-7 mb-3 py-2 px-4 bg-tiffany hover:bg-blue_green text-white font-semibold" onClick={handleClick}>
            { followText() }
          </button>
        ) }

        <h4 className="text-20 font-bold mb-4">Friends</h4>

        { friends.map((friend, index) => (
          <div key={index} className="mb-4">
            <Avatar
              user={friend}
              showName
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rightbar;