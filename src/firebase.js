// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, addDoc } from 'firebase/firestore';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAD_d46XxLAajYUB6thwEhtcHWXDe6mgNQ",
  authDomain: "estatemanager-30ef0.firebaseapp.com",
  projectId: "estatemanager-30ef0",
  storageBucket: "estatemanager-30ef0.appspot.com",
  messagingSenderId: "771262454041",
  appId: "1:771262454041:web:740aa148230314cfc24d88",
  measurementId: "G-HCNSYCVT50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const db = getFirestore(app);