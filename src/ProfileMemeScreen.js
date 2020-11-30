import React, {useState, useEffect, useContext, useRef} from "react";
import {UserContext} from './providers/UserProvider';
import './Home.css';
import Meme from './Meme';
import {db} from './firebase';

function ProfileMemeScreen() {
  const user = useContext(UserContext);
  const [memes, setMemes] = useState([]);
  const [memeRef, setMemeRef] = useState([]);

  useEffect(() => {
    const memesOwned = user.memesOwned;

    memesOwned.map(memeOwned => {
      db.collection('memes').doc(memeOwned).get().then((doc) => {
        if(doc.exists){
          setMemes(prev => [...prev, doc.data()]);
        }else{
          console.log("no meme under this id");
        }
      })
    });


  }, []);

  const scrollToClicked = () => {

  }

  return (
    <div>
      <div className="home-memes">
        {memes.map(({url, channel, description, likes, messages, shares}, index) => {
          return <Meme
            key={index}
            url = {url}
            channel = {channel}
            description = {description}
            likes = {likes}
            messages = {messages}
            shares = {shares}
           />
        })}
      </div>
    </div>
  );
}

export default ProfileMemeScreen;
