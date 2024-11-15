// Importa dotenv y configura las variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// Importa las funciones necesarias de la SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Importa Storage
import { getAuth } from 'firebase/auth'; // Importa el módulo de autenticación

// Tu configuración de Firebase usando variables de entorno
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore y Storage
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // Inicializa Firebase Authentication

// Exporta los módulos para usarlos en otros archivos
export { db, storage, auth };
