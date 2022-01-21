import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import axios from "../../api";
import { useSelector } from "react-redux";

const Feed = ({ username }) => {
  const user = useSelector((state) => state.user.currentUser);
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/" + user._id);

      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };

    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="p-5">
      {(!username || username === user.username) && <Share />}

      { posts.map((post) => (
        <Post key={post._id} post={post} />
      )) }
    </div>
  );
}

export default Feed;