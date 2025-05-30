import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";   
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyChA4INXcWqMv7mcIu-ZT2sCx3v4yj6br4",
  authDomain: "myportfolio-92111.firebaseapp.com",
  projectId: "myportfolio-92111",
  storageBucket: "myportfolio-92111.firebasestorage.app",
  messagingSenderId: "1069893815374",
  appId: "1:1069893815374:web:bc36435fc40f78187f871f",
  measurementId: "G-RBZE4682K9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app)
