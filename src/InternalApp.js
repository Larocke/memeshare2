import React, {useState,useEffect,useRef} from "react";
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
import AddBoxIcon from '@material-ui/icons/AddBox';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import {TransitionGroup, CSSTransition} from 'react-transition-group';

function InternalApp(props) {
  const timeout = {enter: 800, exit: 400};
  const location = useLocation();
  const isFirstRun = useRef(true);

  const getPathDepth = () => {
    let pathArr = location.pathname.split('/');
    pathArr = pathArr.filter(n => n !== "")[0];
    return pathArr;
  }

  const [prevDepth, setPrevDepth] = useState(getPathDepth());

  useEffect(() => {
    if(isFirstRun.current){
      isFirstRun.current = false;
      return;
    }
    setPrevDepth(getPathDepth());
  }, [props.count]);



  return (
          <TransitionGroup component="div">
            <CSSTransition timeout={timeout} className="page-slider" mountOnEnter={false} mountOnExit={true}>
              <div className=''>
                <Switch>
                <Route exact path="/upload">
                  <Upload />
                </Route>

                  <Route exact path="/home">
                    <Home />
                  </Route>

                  <Route exact path="/profile">
                    <Profile />
                  </Route>
                </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
    )
}

export default InternalApp;
