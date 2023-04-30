import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseApp from './firebase'; 
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// const config = ({
//   apiKey: "AIzaSyBxOZMMCtyuLJeTPiTvzO-f48M2eUWAhjM",
// authDomain: "icsi518projectm.firebaseapp.com",
// projectId: "icsi518projectm",
// storageBucket: "icsi518projectm.appspot.com",
// messagingSenderId: "717353397564",
// appId: "1:717353397564:web:7115df436c70a791424239",
// measurementId: "G-6Q9WBXR07W"
// });
// const app = initializeApp(config);
// const auth = getAuth();

async function doCreateUserWithEmailAndPassword(email, password, displayName) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
  firebase.auth().currentUser.updateProfile({displayName: displayName});
}

async function doChangePassword(email, oldPassword, newPassword) {
  let credential = firebase.auth.EmailAuthProvider.credential(
    email,
    oldPassword
  );
  await firebase.auth().currentUser.reauthenticateWithCredential(credential);
  await firebase.auth().currentUser.updatePassword(newPassword);
  await doSignOut();
}

async function doSignInWithEmailAndPassword(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
}


async function doPasswordReset(email) {
  await firebase.auth().sendPasswordResetEmail(email);
}

async function doPasswordUpdate(password) {
  await firebase.auth().updatePassword(password);
}

async function doSignOut() {
  await firebase.auth().signOut();
}

export {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doPasswordReset,
  doPasswordUpdate,
  doSignOut,
  doChangePassword
};