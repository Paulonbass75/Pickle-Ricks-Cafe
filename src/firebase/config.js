// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  //Prod Config
  apiKey: "AIzaSyAkEIsP0t9R50mzOsheY_CY2Hcfv0DEc1c",
  authDomain: "after-chat.firebaseapp.com",
  projectId: "after-chat",
  storageBucket: "after-chat.appspot.com",
  messagingSenderId: "745606054449",
  appId: "1:745606054449:web:0084e3a9593d56f1720b10",
  //Test config
  // apiKey: "AIzaSyDVcpocrg_YkZJyS13X57xyYxUOKS0UYCw",
  // authDomain: "chat-app-6d04f.firebaseapp.com",
  // projectId: "chat-app-6d04f",
  // storageBucket: "chat-app-6d04f.appspot.com",
  // messagingSenderId: "44224564755",
  // appId: "1:44224564755:web:3d73b8009297aa1d9cf9e6",
};
// init firebase
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, timestamp };
