import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

const Home = () => {
  return (
    <main className="grid grid-rows-content">
      <Topbar />

      <div className="container grid grid-cols-layout-desktop">
        <Sidebar />

        <Feed/>

        <Rightbar />
      </div>
    </ main>
  );
}

export default Home;