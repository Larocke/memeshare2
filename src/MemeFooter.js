import React from 'react';
import './MemeFooter.css';

function MemeFooter({channel, description}){
  return (
      <div className="meme-footer">
        <div className="meme-footer-text">
          <h3>@{channel}</h3>
          <p>{description}</p>
        </div>
      </div>
  )
}

export default MemeFooter;
