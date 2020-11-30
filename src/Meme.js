import React, {useState} from 'react';
import './Meme.css';
import MemeFooter from './MemeFooter';
import MemeSidebar from './MemeSidebar';
import MemeHeader from './MemeHeader';

function Meme({url, channel, description, likes, messages, shares, uid}){
  const [iconsVisible, setIconsVisible] = useState(true);

  return (
    <div className="meme">
      <img className="meme-card" src={url} onClick={e => {
        setIconsVisible(prev => !prev);
      }}></img>
      {
        iconsVisible ?
          <div>
          <MemeFooter
            channel= {channel}
            description = {description}
          />
          <MemeSidebar
            likes = {likes}
            messages = {messages}
            shares = {shares}
            uid = {uid}
           />
           <MemeHeader
           />
           </div> : <div></div>

      }

    </div>
  )
}

export default Meme;
