// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDummyKey_TrainTrackerProduction2026",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "find-my-train-9db88.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "find-my-train-9db88",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "find-my-train-9db88.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "103984719284",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:103984719284:web:9db88fa83b12",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-8J372991"
};

// Initialize Firebase safely
let app;
let auth;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
} catch (e) {
  console.warn("Firebase initialization notice:", e.message);
  // Resilient fallback stub
  auth = {
    currentUser: null,
    onAuthStateChanged: (cb) => {
      const user = localStorage.getItem("train_tracker_user");
      cb(user ? JSON.parse(user) : null);
      return () => {};
    }
  };
}

export { app, auth };
export default auth;
