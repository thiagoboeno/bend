import {
  RssFeed,
  Chat,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="p-5 border-r-2 border-solid border-gray-100">
      <ul>
        <li className="mb-5 text-gray-600">
          <Link to="/">
            <RssFeed className="mr-3" />
            
            <span>Feed</span>
          </Link>
        </li>

        <li className="mb-5 text-gray-600">
          <Link to="/messenger">
            <Chat className="mr-3" />
            
            <span>Chats</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;