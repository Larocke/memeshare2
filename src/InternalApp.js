import React, {useState,useEffect,useRef} from "react";
import {
  Switch,
  Route,
  useLocation
} from "react-router-dom";

import Home from './Home';
import Profile from './Profile';

import './App.css';

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
