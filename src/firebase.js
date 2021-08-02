import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbyLvtwFzxlsGNGlpqA-bPg44AvnITbyo",
  authDomain: "music-player-85867.firebaseapp.com",
  projectId: "music-player-85867",
  storageBucket: "music-player-85867.appspot.com",
  messagingSenderId: "205556845355",
  appId: "1:205556845355:web:6c4b57f4b54ed4b2bb136e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase was successfully init.");
}

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
