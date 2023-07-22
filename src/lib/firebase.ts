import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// old config
const firebaseConfig = {
  apiKey: "AIzaSyCBXbaznoMDxTnDM0CgVFiYrzgnK7RYBAM",
  authDomain: "ilyas-28ee1.firebaseapp.com",
  projectId: "ilyas-28ee1",
  storageBucket: "ilyas-28ee1.appspot.com",
  messagingSenderId: "745241299666",
  appId: "1:745241299666:web:e3bee2e83602e7aaacbb0b",
  measurementId: "G-7XC45FXHK9"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
