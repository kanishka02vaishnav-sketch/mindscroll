import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoJRSzCG8RtfowtM4KKd9jdHtrOaMYyEk",
  authDomain: "mindscroll-1d179.firebaseapp.com",
  projectId: "mindscroll-1d179",
  storageBucket: "mindscroll-1d179.firebasestorage.app",
  messagingSenderId: "749149883089",
  appId: "1:749149883089:web:31c9d0fef639ddea3ed3f0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);