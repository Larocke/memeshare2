import React, {useEffect, useState} from 'react';
import {db} from './firebase';
import {Image} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import './MemesOwned.css';

function MemesOwned(props){
  const [memeURL, setMemeURL] = useState('');
  const history = useHistory();

  useEffect(() => {
    db.collection('memes').doc(props.memeId).get().then((doc) => {
      if(doc.exists){
        setMemeURL(doc.data().url);
      }else{
        console.log("no meme under this id");
      }
    })
  }, [])



  return (
    <div className="frame"
        onClick = {e => {
          //history.push('/profileMemeScreen')
          console.log(history);
        }}>
      <span className="helper"></span><Image className="img" src={memeURL} />

    </div>
  )
}

export default MemesOwned;
