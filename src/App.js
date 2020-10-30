import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import Home from './Home';
import Upload from './Upload';
import Profile from './Profile';
import Login from './Login';
import Signup from './Signup';
import PasswordReset from './PasswordReset';
import UserProvider from './providers/UserProvider';

import './App.css';

import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox'

import InternalApp from './InternalApp';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">

          <Switch>

            <Route exact path="/">
              <Login />
            </Route>

            <Route exact path="/signup">
              <Signup />
            </Route>

            <Route exact path="/passwordReset">
              <PasswordReset />
            </Route>
          </Switch>

          <InternalApp />
        </div>
      </Router>
    </UserProvider>
    )
}

export default App;
