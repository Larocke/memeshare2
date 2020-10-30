import React, {useState, useEffect} from "react";
import './Home.css';
import Meme from './Meme';
import {db} from './firebase';

function Home() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    db.collection('memes').onSnapshot(snapshot => {
      setMemes(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

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

export default Home;
