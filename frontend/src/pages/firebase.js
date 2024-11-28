import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Importa Storage

const firebaseConfig = {
  apiKey: "AIzaSyA6FM-lkZRM0R1aSw9ZDoSsCf3Sufnd9TQ",
  authDomain: "database-camaleon.firebaseapp.com",
  databaseURL: "https://database-camaleon-default-rtdb.firebaseio.com",
  projectId: "database-camaleon",
  storageBucket: "database-camaleon.appspot.com",
  messagingSenderId: "354363698225",
  appId: "1:354363698225:web:b95243338b87a49f543910"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore y Storage
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // Inicializa Firebase Authentication

// Exporta los módulos para usarlos en otros archivos
export { db, storage, auth };
