// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZjeF_DfLFCNAobUP2Ck7tTw_2rZjrcMY",
  authDomain: "lotto-group-chat.firebaseapp.com",
  projectId: "lotto-group-chat",
  storageBucket: "lotto-group-chat.appspot.com",
  messagingSenderId: "924696504449",
  appId: "1:924696504449:web:9cbf59c413eb31bd400580",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
