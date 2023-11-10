// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1da9kzRgMuVWe59E0psND1FRIHuqT-JY",
  authDomain: "nwitter-reloaded-2f6a4.firebaseapp.com",
  projectId: "nwitter-reloaded-2f6a4",
  storageBucket: "nwitter-reloaded-2f6a4.appspot.com",
  messagingSenderId: "1074231207185",
  appId: "1:1074231207185:web:201c83683cbecff24118b0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
