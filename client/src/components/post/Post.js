import Avatar from "../avatar/Avatar";
import { Favorite } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "../../api";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const postImageFolder = process.env.REACT_APP_POST_IMAGES_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${post.userId}`);
      setUser(res.data);
    };

    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}

    setLike(isLiked ? like - 1 : like + 1);

    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full rounded-lg shadow my-7">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Avatar user={user} showName />

          <span className="text-14 text-gray-600 ml-4">{format(post.createdAt)}</span>
        </div>

        <div className="my-5">
          <span className="text-16">{post?.desc}</span>
          
          <img className="max-h-500 w-full mt-5 rounded-lg object-cover" src={postImageFolder + post.img} alt="" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Favorite
              className={`w-6 h-6 mr-1 text-gray-600 cursor-pointer ${isLiked && 'text-red-500'}`}
              onClick={likeHandler}
            />

            <span className="text-14 text-gray-600">{like}</span>
          </div>

          <span className="text-16 text-gray-600 cursor-pointer">0 comments</span>
        </div>
      </div>
    </div>
  );
}

export default Post;