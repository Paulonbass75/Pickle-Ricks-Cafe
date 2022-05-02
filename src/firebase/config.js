// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVcpocrg_YkZJyS13X57xyYxUOKS0UYCw",
  authDomain: "chat-app-6d04f.firebaseapp.com",
  projectId: "chat-app-6d04f",
  storageBucket: "chat-app-6d04f.appspot.com",
  messagingSenderId: "44224564755",
  appId: "1:44224564755:web:074cfb14252df40e9cf9e6"
};
// init firebase
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, timestamp };
