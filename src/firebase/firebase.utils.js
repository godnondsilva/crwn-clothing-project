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

export const createUserProfileDocument = async (userAuth, additionalData) => {

  // no file? do nothing
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    // for time at the moment of creation
    const createdAt = new Date();

    // creates a document in the firebase database
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
        console.log('Error creating the user!');
    }
  }

  return userRef;
}

firebase.initializeApp(config);

// loading auth and firestore to const variables
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// so that we can use only google, not others like facebook n stuff
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// here we can use the google signin (provider)
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;