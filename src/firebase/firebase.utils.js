import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBw--hJO5_pHSfe5mX8uZxxcAeimqPV4ak",
  authDomain: "crwn-db-45888.firebaseapp.com",
  databaseURL: "https://crwn-db-45888.firebaseio.com",
  projectId: "crwn-db-45888",
  storageBucket: "",
  messagingSenderId: "840875270829",
  appId: "1:840875270829:web:a8a536f8a88008171e9c24",
  measurementId: "G-BLNGPGDD77"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
