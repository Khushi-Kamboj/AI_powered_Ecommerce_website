import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-2ad07.firebaseapp.com",
  projectId: "loginonecart-2ad07",
  storageBucket: "loginonecart-2ad07.firebasestorage.app",
  messagingSenderId: "288622358678",
  appId: "1:288622358678:web:3775378929d5cde608d2b7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider;


export {auth , provider}