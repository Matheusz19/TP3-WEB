// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC09c5M0qpVfl5XDYb8Ns6pddeuU6WuCd4",
  authDomain: "tp3-70be1.firebaseapp.com",
  projectId: "tp3-70be1",
  storageBucket: "tp3-70be1.appspot.com",
  messagingSenderId: "637102824904",
  appId: "1:637102824904:web:c1eafb72de6699b93474fd",
  measurementId: "G-VRQNTQNDDQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, firestore };