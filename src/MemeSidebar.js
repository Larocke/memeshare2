import React, {useState} from 'react';
import './MemeSidebar.css';

import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';



function MemeSidebar({likes, messages, shares}){
  const [liked, setLiked] = useState(false);

  return (
    <div className="meme-sidebar">
      <div className="meme-sidebar-buttons">
        {
          liked ?
            <FavoriteOutlinedIcon fontSize="large" style={{color: "red"}}
            onClick={e => setLiked(false)} /> :
            <FavoriteOutlinedIcon fontSize="large"
            onClick={e => setLiked(true)} />
        }
        <p>{liked ? likes + 1 : likes}</p>
      </div>
      <div className="meme-sidebar-buttons">
        <MessageOutlinedIcon fontSize="large" />
        <p>{messages.length}</p>
      </div>
      <div className="meme-sidebar-buttons">
        <ShareOutlinedIcon fontSize="large" />
        <p>{shares}</p>
      </div>

    </div>
  )
}

export default MemeSidebar;
