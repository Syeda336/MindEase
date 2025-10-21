// firebase.tsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBz9hjQi8RF55dSLe6fuNrcKLBE6Ftuedk",
  authDomain: "mindease-bd56f.firebaseapp.com",
  projectId: "mindease-bd56f",
  storageBucket: "mindease-bd56f.firebasestorage.app",
  messagingSenderId: "863804462437",
  appId: "1:863804462437:web:dcbb225db540d3badc7d8c",
  measurementId: "G-NDK60P9SFH",
};

// ✅ Initialize once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

// ✅ Export auth to use in LoginPage

const auth = firebase.auth();

export { firebase, auth };


