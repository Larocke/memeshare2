import React, {useState, useContext, useEffect} from 'react';
import './MemeSidebar.css';
import {db} from './firebase';
import firebase from 'firebase/app';

import {UserContext} from './providers/UserProvider';

import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';

import {Modal, Button} from 'react-bootstrap';



function MemeSidebar({likes, messages, shares, uid}){
  const user = useContext(UserContext);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const [liked, setLiked] = useState(false);
  const [check, setCheck] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState("");


  useEffect(() => {
    console.log(messages);
    setDisplayName(user.displayName);
    setPhotoURL(user.photoURL);

    setLiked(likes.includes(displayName));
  }, [check]);

////////////////////////////// Likes
  const handleLikes = async (e) => {
    if(liked){
      await db.collection('memes').doc(uid).update({likes: firebase.firestore.FieldValue.arrayRemove(displayName)});
    }else{
      await db.collection('memes').doc(uid).update({likes: firebase.firestore.FieldValue.arrayUnion(displayName)});
    }
    setCheck(prev => !prev);
  }

/////////////////////////////// Messages

  const handleShowModal = () => {setShowModal(true)};
  const handleCloseModal = () => {setShowModal(false)};

  const handleNewComment = (e) => {setNewComment(e.target.value)};

  const submitNewComment = async (e) => {
    e.preventDefault();
    await db.collection('memes').doc(uid).update({messages: firebase.firestore.FieldValue.arrayUnion({displayName: displayName, message: newComment})});
    setNewComment("");
  }

// const handleLikes = async (e) => {
//   if(liked){
//     await db.collection('memes').doc(uid).update({likes: firebase.firestore.FieldValue.arrayRemove(displayName)});
//   }else{
//     await db.collection('memes').doc(uid).update({likes: firebase.firestore.FieldValue.arrayUnion(displayName)});
//   }
//   setCheck(prev => !prev);
// }


  return (
    <div className="meme-sidebar">
      <div className="meme-sidebar-buttons">
        {
          liked ?
            <FavoriteOutlinedIcon fontSize="large" style={{color: "red"}}
            onClick={handleLikes} /> :
            <FavoriteOutlinedIcon fontSize="large" style={{color: "black"}}
            onClick={handleLikes} />
        }
        <p style={{color: "black"}}>{likes.length}</p>
      </div>
      <div className="meme-sidebar-buttons">
        <MessageOutlinedIcon onClick={handleShowModal} fontSize="large" style={{color: "black"}} />
        <p style={{color: "black"}}>{messages.length}</p>
      </div>

      {/*<div className="meme-sidebar-buttons">
        <ShareOutlinedIcon fontSize="large" />
        <p>{shares}</p>
      </div>*/}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <h1>Comments</h1>
        {/*
        {messages.map((message) => {
          return(
              <div>
                <p>@{message.displayName}: {message.message}</p>
              </div>
            )
          }
        )}
        */}
        <form onSubmit={submitNewComment}>
          <textarea maxLength="200" value={newComment} onChange={handleNewComment} />
          <Button type="submit">Submit</Button>
        </form>
      </Modal>

    </div>
  )
}

export default MemeSidebar;
