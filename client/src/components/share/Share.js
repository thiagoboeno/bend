import Avatar from "../avatar/Avatar";
import {
  PermMedia,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../api";

const Share = () => {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {    
      try {
        const data = new FormData();
        data.append("postImage", file);

        const postImage = await axios.post("/upload", data);
        newPost.img = postImage.data;
      } catch (err) {}
    }

    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="shadow rounded-lg">
      <div className="p-4">
        <div className="flex items-center">
          <Avatar user={user} />

          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="w-full ml-4 border-none"
            ref={desc}
          />
        </div>

        <hr className="my-5" />

        { file && (
          <div className="relative mb-5">
            <img className="w-full rounded-lg object-cover" src={URL.createObjectURL(file)} alt="" />
            
            <Cancel className="absolute top-1 right-1 cursor-pointer" onClick={() => setFile(null)} />
          </div>
        )}

        <form className="flex items-center justify-between" onSubmit={submitHandler}>
          <div className="flex">
            <label htmlFor="file" className="flex items-center cursor-pointer">
              <PermMedia htmlColor="tomato" className="mr-2" />
              
              <span className="text-16">Photo or Video</span>
              
              <input
                id="file"
                className="hidden"
                type="file"
                accept=".png,.jpeg,.jpg, .gif"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>

          <button className="py-2 px-4 bg-tiffany hover:bg-blue_green text-white font-semibold" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;