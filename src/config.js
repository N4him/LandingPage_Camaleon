// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Agrega esta línea para Firebase Storage

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
const storage = getStorage(app);  // Inicializa Firebase Storage

export { db, storage };  // Exporta ambos para usarlos en otros archivos
