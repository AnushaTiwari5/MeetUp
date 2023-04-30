import firebase from 'firebase/compat/app';
import 'firebase/auth'; // import the specific Firebase feature you need

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBxOZMMCtyuLJeTPiTvzO-f48M2eUWAhjM",
  authDomain: "icsi518projectm.firebaseapp.com",
  projectId: "icsi518projectm",
  storageBucket: "icsi518projectm.appspot.com",
  messagingSenderId: "717353397564",
  appId: "1:717353397564:web:7115df436c70a791424239",
  measurementId: "G-6Q9WBXR07W"
});

export default firebaseApp;