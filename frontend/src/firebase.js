import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
const authDomain = import.meta.env.VITE_REACT_APP_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_REACT_APP_PROJECT_ID;
const storageBucket = import.meta.env.VITE_REACT_APP_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_REACT_APP_MASSEGING_SENDER_ID;
const appId = import.meta.env.VITE_REACT_APP_APP_ID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export {auth, db, storage}
