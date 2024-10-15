// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6FM-lkZRM0R1aSw9ZDoSsCf3Sufnd9TQ",
  authDomain: "database-camaleon.firebaseapp.com",
  databaseURL: "https://database-camaleon-default-rtdb.firebaseio.com",
  projectId: "database-camaleon",
  storageBucket: "database-camaleon.appspot.com",
  messagingSenderId: "354363698225",
  appId: "1:354363698225:web:b95243338b87a49f543910"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;