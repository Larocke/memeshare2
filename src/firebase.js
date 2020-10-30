import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_3aRC9nH5WRTCNxJsCYsfAhkGZiMcjZE",
  authDomain: "memeshare-2.firebaseapp.com",
  databaseURL: "https://memeshare-2.firebaseio.com",
  projectId: "memeshare-2",
  storageBucket: "memeshare-2.appspot.com",
  messagingSenderId: "481790644434",
  appId: "1:481790644434:web:6c36f604790a520bc15d0b",
  measurementId: "G-DFB2HYHBHV"
};


// Database and authentication objects
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();


// Google sign in
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
}

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL, description, memesOwned } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        description,
        memesOwned,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await db.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
