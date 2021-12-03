import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
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
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  
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
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>

        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;