// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAPJrOYRh6jx-pCrgQIofZcVYL3wKkF4-A",
    authDomain: "login12-a8a63.firebaseapp.com",
    projectId: "login12-a8a63",
    storageBucket: "login12-a8a63.appspot.com",
    messagingSenderId: "489132254451",
    appId: "1:489132254451:web:8c136d0778edd0ebc90386",
    measurementId: "G-9XBDPP7TFX"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
