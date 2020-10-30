import React, {useContext, useState, useEffect, useRef} from "react";
import {UserContext} from './providers/UserProvider';
import {db, storage, auth} from './firebase';
import {useHistory, Link} from 'react-router-dom';
import firebase from 'firebase/app';


import './Profile.css';

import ImageIcon from '@material-ui/icons/Image';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {Modal, Button} from 'react-bootstrap';



function Profile() {
  const user = useContext(UserContext);
  const history = useHistory();
  const [imageHash, setImageHash] = useState(Date.now());
  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if(user == null){
      history.push("/");
    }else{
      setPhotoURL(user.photoURL);
      setDisplayName(user.displayName);
      setEmail(user.email);
      setDescription(user.description);
    }
  }, [])

  const [showModal, setShowModal] = useState(false);

  const [newDescription, setNewDescription] = useState("");
  const [descriptionAltered, setDescriptionAltered] = useState(0);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleNewDescription = (event) => {
    setNewDescription(event.currentTarget.value)
  }

  const submitNewDescription = async () => {
    const descriptionUpdate = await db.collection('users').doc(user.uid).update({description: newDescription});
    setDescription(newDescription);
    setNewDescription('');
    handleCloseModal();
  }

    const uploadNewProfilePic = e => {
      if (e.target.files[0]){
        const uploadTask = storage.ref('profilepics/' + user.uid).put(e.target.files[0]);

        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {console.log(error)},
          async () => {
            const picURL = await storage.ref('profilepics').child(user.uid).getDownloadURL();
            const picUpdate = await db.collection('users').doc(user.uid).update({photoURL: picURL});
            setImageHash(Date.now());
          });
      }
    }

    const uploadNewMeme = async (e) => {
      if(e.target.files[0]){
        // creates an empty meme template in database to obtain ID
        const memeCreateInDB = await db.collection('memes').add({
          channel: displayName,
          description: "",
          likes: "0",
          messages: {},
          shares: "0",
          url: ""});

        const uploadTask = storage.ref('memes/' + memeCreateInDB.id).put(e.target.files[0]);

        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {console.log(error)},
          async () => {
            // returns meme URL, adds that URL to memes owned in the user profile, updates url in meme template mentioned above
            const memeURL = await storage.ref('memes').child(memeCreateInDB.id).getDownloadURL();
            const userUpdate = await db.collection('users').doc(user.uid).update({memesOwned: firebase.firestore.FieldValue.arrayUnion(memeCreateInDB.id)});
            const memeUpdate = await db.collection('memes').doc(memeCreateInDB.id).update({url: memeURL});
          });
      }
    }

    const signOut = () => {
      auth.signOut()
      history.push("/");
    }

  return (
    <div>
        <div className="border items-center md:flex-row md:items-start border-blue-400 px-3 py-4">

        <Link style={{color: "black"}} to='/home'><ArrowBackIcon className="highlight-button" fontSize="large" style={{float: "left"}} /></Link>
        <ExitToAppIcon className="highlight-button" fontSize="large" style={{float: "right"}} onClick={signOut} />

          <div
            style={{
              background: `url(${photoURL}?${imageHash}) no-repeat center`,
              height: "200px",
              width: "200px",
              borderRadius: "100%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto"
            }}>
                <label>
                  <input type="file" onChange={uploadNewProfilePic} />
                  <ImageIcon fontSize="large" className="customPhotoUpload" />
                </label>
          </div>
          <h4
            style={{
              paddingTop: "15px",
              textAlign: "center"
            }}
          >@{displayName}</h4>

          <div className="description center-object">
            <p>{description}</p>
            <a className="highlight-button" onClick={handleShowModal}>Edit Description</a>
          </div>

          <label className="center-object">
            <input type="file" onChange={uploadNewMeme} />
            <AddIcon className="highlight-button" fontSize="large" />
          </label>



        </div>



        <Modal show={showModal} onHide={handleCloseModal} centered>
          <h4>Edit your description</h4>
          <textarea maxLength="50" value={newDescription} onChange={handleNewDescription} />
          <Button onClick={submitNewDescription}>Submit</Button>
        </Modal>

    </div>
  );
}

export default Profile;
