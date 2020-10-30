import React, {useContext, useState, useEffect} from "react";
import {UserContext} from './providers/UserProvider';
import {db, storage, auth} from './firebase';
import {useHistory, Link} from 'react-router-dom';
import firebase from 'firebase/app';
import MemesOwned from './MemesOwned';


import './Profile.css';

import ImageIcon from '@material-ui/icons/Image';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CircularProgress from '@material-ui/core/CircularProgress';

import {Modal, Button, Container, Row, Col} from 'react-bootstrap';



function Profile() {
  const user = useContext(UserContext);
  const history = useHistory();
  const [imageHash, setImageHash] = useState(Date.now());
  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [memesOwned, setMemesOwned] = useState([]);
  const [uploadingMeme, setUploadingMeme] = useState(false);

  useEffect(() => {
    if(user == null){
      history.push("/");
    }else{
      setPhotoURL(user.photoURL);
      setDisplayName(user.displayName);
      setDescription(user.description);
      setMemesOwned(user.memesOwned);
    }
  }, [imageHash])

  const [showModal, setShowModal] = useState(false);
  const [showUploadMeme, setShowUploadMeme] = useState(false);

  const [newDescription, setNewDescription] = useState("");

  const [newMeme, setNewMeme] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCloseUploadMeme = () => setShowUploadMeme(false);
  const handleShowUploadMeme = () => setShowUploadMeme(true);

  const handleNewDescription = (event) => {
    setNewDescription(event.currentTarget.value)
  }

  const submitNewDescription = async () => {
    await db.collection('users').doc(user.uid).update({description: newDescription});
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
            await db.collection('users').doc(user.uid).update({photoURL: picURL});
            setImageHash(Date.now());
          });
      }
    }

    const handleNewMeme = (e) => {
      if(e.target.files[0]){
        setNewMeme(e.target.files[0]);
      }

    }

    const uploadNewMeme = async () => {
        setUploadingMeme(true);
        // creates an empty meme template in database to obtain ID
        const memeCreateInDB = await db.collection('memes').add({
          channel: displayName,
          description: "",
          likes: "0",
          messages: {},
          shares: "0",
          url: ""});

        const uploadTask = storage.ref('memes/' + memeCreateInDB.id).put(newMeme);

        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {console.log(error)},
          async () => {
            // returns meme URL, adds that URL to memes owned in the user profile, updates url in meme template mentioned above
            const memeURL = await storage.ref('memes').child(memeCreateInDB.id).getDownloadURL();
            await db.collection('users').doc(user.uid).update({memesOwned: firebase.firestore.FieldValue.arrayUnion(memeCreateInDB.id)});
            await db.collection('memes').doc(memeCreateInDB.id).update({url: memeURL});

            setMemesOwned(prev => [...prev, memeCreateInDB.id]);
            handleCloseUploadMeme();
            setUploadingMeme(false);

        });
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
                  <input className="hidden" type="file" onChange={uploadNewProfilePic} />
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


          <AddIcon className="highlight-button center-object" fontSize="large" onClick={handleShowUploadMeme} />


        </div>

        <Container>
          <Row>
            {memesOwned.map((memeId, index) => {
              return <Col xs={4} className="panels">
               <MemesOwned
                key={index}
                memeId = {memeId}
               />
               </Col>
            })}
          </Row>
        </Container>



        <Modal show={showModal} onHide={handleCloseModal} centered>
          <h4>Edit your description</h4>
          <textarea maxLength="50" value={newDescription} onChange={handleNewDescription} />
          <Button onClick={submitNewDescription}>Submit</Button>
        </Modal>

        <Modal show={showUploadMeme} onHide={handleCloseUploadMeme} centered>
          {uploadingMeme ?
            <div className="center-object">
              <CircularProgress className="circular-progress" />
              <h2>Upload...</h2>
            </div> :
            <div>
              <h4>Upload New Meme</h4>
              <p>Description</p>
              <textarea maxLength="200" value={newDescription} onChange={handleNewDescription} />
              <br />
              <input type="file" onChange={handleNewMeme} />
              <br />
              <Button onClick={uploadNewMeme}>Submit</Button>
            </div>
          }


        </Modal>



    </div>
  );
}

export default Profile;
