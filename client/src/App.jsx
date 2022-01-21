import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import Register from "./pages/register/Register";
import SendResetEmail from "./pages/sendResetEmail/SendResetEmail";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import Messenger from "./pages/messenger/Messenger";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>

        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>

        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>

        <Route exact path="/reset-password">
          <SendResetEmail />
        </Route>

        <Route path="/reset-password/:userId/:token">
          <ResetPassword />
        </Route>

        <Route path="/messenger">
          {user ? <Messenger /> : <Register />}
        </Route>

        <Route exact path="/profile/update">
           {user ? <UpdateProfile /> : <Register />}
        </Route>

        <Route path="/profile/:username">
           {user ? <Profile /> : <Register />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;