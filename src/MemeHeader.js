import React, {useState, useContext} from 'react';
import {UserContext} from './providers/UserProvider';
import {Link, useHistory} from 'react-router-dom';

import AccountBoxIcon from '@material-ui/icons/AccountBox';

import './MemeHeader.css'


function MemeHeader(){
  const user = useContext(UserContext);
  const history = useHistory();

  if(user == null){
    history.push("/");
    return (
      <div></div>
    )
  }
  else{
      const {photoURL, displayName, email} = user;

      return (
        <div className="meme-header">
        <div className="meme-header-buttons">
          <Link to="/profile"><AccountBoxIcon fontSize="large" /></Link>
          </div>
        </div>
      );
  }
}

export default MemeHeader;
